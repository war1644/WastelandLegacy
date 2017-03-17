<?php
namespace Base;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 框架核心路由类
 *
 * @auth NoahBuscher
 * @link https://github.com/NoahBuscher/Macaw
 * @version
 * v1.2 2017/1/28 9:21  修复重复取参的bug by 路漫漫
 * v1.1 2017/1/2 13:52 增加waf防御,传递调用方法到调用类 by 路漫漫
 */


/**
 * @method static Macaw get(string $route, Callable $callback)
 * @method static Macaw post(string $route, Callable $callback)
 * @method static Macaw put(string $route, Callable $callback)
 * @method static Macaw delete(string $route, Callable $callback)
 * @method static Macaw options(string $route, Callable $callback)
 * @method static Macaw head(string $route, Callable $callback)
 */
class Macaw {
    public static $halts = false;
    public static $wafs = array();
    public static $routes = array();//设置的url
    public static $methods = array();
    public static $callbacks = array();
    //正则
    public static $patterns = array(
        ':any' => '[^/]+',
        ':num' => '[0-9]+',
        ':all' => '.*',
        ':slug'=> '[a-z0-9-_]+'
    );
    public static $error_callback;

    /**
     * Defines a route w/ callback and method
     */
    public static function __callstatic($method, $params) {
        //取PHP_SELF会导致$uri重复参数，修改为SCRIPT_NAME
//        $uri = dirname($_SERVER['PHP_SELF']).'/'.$params[0];
        $uri = dirname($_SERVER['SCRIPT_NAME']).'/'.$params[0];
        $callback = $params[1];
        if (empty($params[2]) || $params[2]===true){
            array_push(self::$wafs, true);
        }else{
            array_push(self::$wafs, false);
        }
        array_push(self::$routes, $uri);
        array_push(self::$methods, strtoupper($method));
        array_push(self::$callbacks, $callback);
    }

    /**
    * Defines callback if route is not found
    */
    public static function error($callback) {
        self::$error_callback = $callback;
    }

    public static function haltOnMatch($flag = true) {
        self::$halts = $flag;
    }

    /**
    * Runs the callback for the given request
    */
    public static function dispatch(){
        //当前请求不带参数url,忽略域名
        $uri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        //当前请求方法
        $method = $_SERVER['REQUEST_METHOD'];
        //记录到日志
        MFLog("访问 : $uri,  method : $method");
        $searches = array_keys(static::$patterns);
        $replaces = array_values(static::$patterns);
        $found_route = false;

        //正则替换
        self::$routes = preg_replace('/\/+/', '/', self::$routes);

        // Check if route is defined without regex
        if (in_array($uri, self::$routes)) {
            $route_pos = array_keys(self::$routes, $uri);
            foreach ($route_pos as $route) {
                // Using an ANY option to match both GET and POST requests
                if (self::$methods[$route] == $method || self::$methods[$route] == 'ANY') {
                    $found_route = true;
                    //非法数据过滤
                    if (self::$wafs[$route]===true) new MFWAF($method);
                    // If route is not an object
                    if (!is_object(self::$callbacks[$route])) {

                        // Grab all parts based on a / separator
                        $parts = explode('/',self::$callbacks[$route]);

                        // Collect the last index of the array
                        $last = end($parts);

                        // Grab the controller name and method call
                        $segments = explode('@',$last);

                        // Instanitate controller
                        $controller = new $segments[0]();
                        //保存当前控制器方法名
                        $controller->method = $segments[1];
                        // Call method
                        $controller->{$segments[1]}();

                        if (self::$halts) return;
                    } else {
                        // Call closure
                        call_user_func(self::$callbacks[$route]);

                        if (self::$halts) return;
                    }
                }
            }
        } else {
            // Check if defined with regex
            $pos = 0;
            foreach (self::$routes as $route) {
                if (strpos($route, ':') !== false) {
                    $route = str_replace($searches, $replaces, $route);
                }

                if (preg_match('#^' . $route . '$#', $uri, $matched)) {
                    if (self::$methods[$pos] == $method || self::$methods[$pos] == 'ANY') {
                        $found_route = true;
                        //非法数据过滤
                        if (self::$wafs[$pos]===true) new MFWAF($method);
                        // Remove $matched[0] as [1] is the first parameter.
                        array_shift($matched);

                        if (!is_object(self::$callbacks[$pos])) {

                            // Grab all parts based on a / separator
                            $parts = explode('/', self::$callbacks[$pos]);

                            // Collect the last index of the array
                            $last = end($parts);

                            // Grab the controller name and method call
                            $segments = explode('@', $last);

                            // Instanitate controller
                            $controller = new $segments[0]();

                            // Fix multi parameters
                            if (!method_exists($controller, $segments[1])) {
                                echo "controller and action not found";
                            } else {
                                //保存当前控制器方法名
                                $controller->method = $segments[1];
                                call_user_func_array(array($controller, $segments[1]), $matched);
                            }

                            if (self::$halts) return;
                        } else {
                            call_user_func_array(self::$callbacks[$pos], $matched);

                            if (self::$halts) return;
                        }
                    }
                }
                $pos++;
            }
        }

        // Run the error callback if the route was not found
        if ($found_route == false) {
            if (!self::$error_callback) {
            self::$error_callback = function() {
                header($_SERVER['SERVER_PROTOCOL'] . " 404 Not Found");
                echo '404';
            };
            } else {
                if (is_string(self::$error_callback)) {
                    self::get($_SERVER['REQUEST_URI'], self::$error_callback);
                    self::$error_callback = null;
                    self::dispatch();
                    return;
                }
            }
            call_user_func(self::$error_callback);
        }
    }
}
