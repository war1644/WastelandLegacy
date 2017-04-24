<?php
namespace App\C;
/**
 *         ▂▃╬▄▄▃▂▁▁
 *  ●●●█〓██████████████▇▇▇▅▅▅▅▅▅▅▅▅▇▅▅          BUG
 *  ▄▅████☆RED █ WOLF☆███▄▄▃▂
 *  █████████████████████████████
 *  ◥⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙▲⊙◤
 *
 * 客户端访客类
 * @author 路漫漫
 * @link ahmerry@qq.com
 * @since
 * v2016/12/9 初版
 */
use App\M\EventsM;
use App\M\JobsM;
use App\M\MapsM;
use App\M\TilesetsM;
use App\M\UsersM;
use Base\Tool\TileMapProcess;
use Base\Tool\Vcode;
use Base\Tool\Page;

class PublicC extends AppC {

    public function upload(){

    }

    public function index(){
        echo ResultFormat(file_get_contents(V_PATH.'Static/assets/home.json'));
    }

    public function test(){
        '[[[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,22,22,1,22,22,1,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,7,7,7,7,7,7,7,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,222,223,171,362,362,362,171,363,225,0,0,0],[0,0,0,232,233,399,399,234,291,291,373,235,0,0,0],[0,0,0,232,0,409,409,0,301,301,0,235,0,0,0],[0,0,0,232,443,441,441,441,441,441,442,235,0,0,0],[0,0,0,232,453,454,454,454,454,454,452,235,0,0,0],[0,0,0,232,124,0,0,0,0,0,0,235,0,0,0],[0,0,0,232,134,0,0,0,0,151,0,235,0,0,0],[0,0,0,232,151,150,151,0,0,150,0,235,0,0,0],[0,0,0,232,0,0,0,0,0,0,0,235,0,0,0],[0,0,0,242,243,243,391,0,392,244,244,245,0,0,0],[0,0,0,252,405,405,401,182,402,405,403,255,0,0,0],[0,0,0,410,415,415,411,0,412,415,413,414,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,104,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,103,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,106,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,109,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]]]';
        '[[["town_0.png","town_1.png","town_2.png","town_3.png","indoor_1.png","indoor_2.png","indoor_3.png","indoor_4.png","indoor_5.png","indoor_6.png","indoor_7.png","indoor_10.png","indoor_271.png","indoor_506.png","indoor_555.png","indoor_396.png","indoor_397.png","indoor_398.png","indoor_173.png","indoor_174.png","indoor_61.png","indoor_502.png","indoor_262.png","indoor_74.png","indoor_405.png","indoor_406.png","indoor_407.png","indoor_408.png","indoor_409.png","indoor_120.png","indoor_310.png","town_0.png","town_0.png","indoor_552.png","indoor_415.png","indoor_416.png","indoor_417.png","indoor_418.png","indoor_419.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","indoor_425.png","indoor_426.png","indoor_427.png","indoor_428.png","indoor_429.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png"],[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]],[["town_0.png","indoor_11.png","indoor_12.png","indoor_13.png","indoor_14.png","indoor_17.png","indoor_18.png","indoor_21.png","indoor_22.png","indoor_23.png","indoor_25.png","indoor_26.png","indoor_28.png","indoor_30.png","indoor_24.png","indoor_27.png","indoor_34.png","indoor_31.png","indoor_32.png","indoor_33.png","indoor_35.png","indoor_36.png","indoor_47.png","indoor_40.png","indoor_29.png","indoor_37.png","indoor_44.png","indoor_42.png","indoor_43.png","indoor_41.png","indoor_46.png","indoor_45.png","indoor_57.png","indoor_102.png","indoor_39.png","indoor_38.png","indoor_54.png","indoor_49.png","indoor_108.png","indoor_109.png","indoor_55.png","indoor_56.png","indoor_59.png","indoor_53.png","indoor_193.png","indoor_48.png","indoor_63.png","indoor_64.png","indoor_65.png","indoor_66.png","indoor_50.png","indoor_51.png","indoor_52.png","indoor_189.png","indoor_203.png","indoor_58.png","indoor_73.png","indoor_74.png","indoor_75.png","indoor_76.png","indoor_60.png","indoor_61.png","indoor_62.png","indoor_67.png","indoor_68.png","indoor_69.png","indoor_83.png","indoor_84.png","indoor_85.png","indoor_86.png","indoor_70.png","indoor_71.png","indoor_72.png","indoor_77.png","indoor_78.png","indoor_79.png","indoor_93.png","indoor_94.png","indoor_95.png","indoor_96.png","indoor_80.png","indoor_81.png","indoor_82.png","indoor_87.png","indoor_88.png","indoor_89.png","indoor_103.png","indoor_104.png","indoor_105.png","indoor_106.png","indoor_112.png","indoor_100.png","town_0.png","indoor_90.png","indoor_91.png","indoor_92.png","indoor_113.png","indoor_114.png","indoor_115.png","indoor_116.png","indoor_122.png","indoor_110.png","indoor_111.png","indoor_97.png","indoor_98.png","indoor_99.png","indoor_118.png","indoor_119.png","indoor_123.png","indoor_117.png","indoor_272.png","indoor_120.png","indoor_121.png","indoor_125.png","indoor_126.png","indoor_199.png","indoor_128.png","indoor_129.png","indoor_133.png","indoor_127.png","indoor_130.png","indoor_131.png","indoor_132.png","indoor_143.png","indoor_160.png","indoor_186.png","indoor_135.png","indoor_136.png","indoor_137.png","indoor_187.png","indoor_140.png","indoor_141.png","indoor_142.png","indoor_144.png","indoor_170.png","indoor_135.png","indoor_136.png","indoor_137.png","indoor_138.png","indoor_139.png","indoor_150.png","indoor_151.png","indoor_152.png","indoor_154.png","indoor_161.png","indoor_145.png","indoor_146.png","indoor_147.png","indoor_148.png","indoor_149.png","indoor_162.png","indoor_172.png","indoor_163.png","indoor_164.png","indoor_171.png","indoor_155.png","indoor_156.png","indoor_157.png","indoor_158.png","indoor_159.png","indoor_568.png","town_0.png","indoor_173.png","indoor_174.png","indoor_199.png","indoor_165.png","indoor_166.png","indoor_167.png","indoor_168.png","indoor_169.png","indoor_569.png","indoor_181.png","indoor_182.png","indoor_183.png","indoor_209.png","indoor_175.png","indoor_176.png","indoor_177.png","indoor_178.png","indoor_179.png","indoor_190.png","indoor_191.png","indoor_213.png","indoor_201.png","indoor_185.png","indoor_184.png","indoor_186.png","indoor_187.png","indoor_188.png","indoor_194.png","indoor_200.png","indoor_192.png","indoor_215.png","indoor_211.png","indoor_205.png","indoor_196.png","indoor_197.png","indoor_195.png","indoor_242.png","indoor_277.png","indoor_210.png","indoor_202.png","indoor_223.png","indoor_222.png","indoor_215.png","indoor_206.png","indoor_204.png","indoor_207.png","indoor_208.png","indoor_287.png","indoor_228.png","indoor_212.png","indoor_224.png","indoor_232.png","indoor_214.png","indoor_214.png","indoor_216.png","indoor_217.png","indoor_218.png","town_0.png","indoor_220.png","indoor_221.png","indoor_250.png","indoor_251.png","indoor_252.png","indoor_255.png","indoor_222.png","indoor_225.png","indoor_226.png","indoor_234.png","indoor_230.png","indoor_231.png","indoor_260.png","indoor_261.png","indoor_262.png","indoor_265.png","indoor_232.png","indoor_233.png","town_0.png","indoor_244.png","indoor_276.png","indoor_241.png","indoor_280.png","indoor_283.png","indoor_284.png","indoor_285.png","indoor_233.png","indoor_256.png","indoor_257.png","indoor_258.png","indoor_286.png","town_0.png","indoor_290.png","indoor_293.png","indoor_293.png","indoor_295.png","indoor_243.png","indoor_266.png","indoor_267.png","indoor_268.png","indoor_500.png","indoor_501.png","indoor_502.png","indoor_503.png","indoor_504.png","indoor_352.png","indoor_353.png","indoor_360.png","indoor_361.png","indoor_379.png","indoor_505.png","town_0.png","town_0.png","town_0.png","indoor_509.png","indoor_362.png","indoor_363.png","indoor_370.png","indoor_371.png","indoor_320.png","indoor_510.png","indoor_511.png","town_0.png","indoor_513.png","indoor_514.png","indoor_372.png","indoor_373.png","indoor_383.png","indoor_384.png","indoor_385.png","indoor_355.png","indoor_359.png","indoor_380.png","indoor_381.png","indoor_382.png","indoor_279.png","indoor_330.png","indoor_393.png","indoor_394.png","indoor_395.png","indoor_365.png","indoor_369.png","indoor_390.png","indoor_391.png","indoor_392.png","indoor_289.png","indoor_550.png","indoor_551.png","indoor_552.png","indoor_553.png","indoor_375.png","town_0.png","indoor_400.png","indoor_401.png","indoor_402.png","indoor_299.png","indoor_554.png","indoor_555.png","indoor_556.png","indoor_557.png","indoor_436.png","indoor_437.png","indoor_410.png","indoor_411.png","indoor_412.png","town_0.png","indoor_558.png","indoor_559.png","indoor_560.png","indoor_561.png","town_0.png","indoor_405.png","indoor_420.png","indoor_421.png","indoor_422.png","indoor_409.png","indoor_564.png","indoor_563.png","indoor_562.png","indoor_565.png","indoor_516.png","indoor_517.png","indoor_518.png","indoor_431.png","town_0.png","indoor_520.png","indoor_521.png","indoor_522.png","town_0.png","indoor_524.png","indoor_566.png","indoor_567.png","town_0.png","indoor_297.png","town_0.png","indoor_525.png","indoor_526.png","indoor_527.png","indoor_528.png","indoor_529.png","indoor_250.png","indoor_251.png","indoor_253.png","indoor_254.png","indoor_255.png","indoor_530.png","indoor_531.png","indoor_532.png","indoor_533.png","indoor_534.png","indoor_260.png","indoor_261.png","indoor_263.png","indoor_264.png","indoor_265.png","indoor_535.png","indoor_536.png","indoor_537.png","indoor_538.png","indoor_539.png","indoor_270.png","town_0.png","town_0.png","town_0.png","indoor_275.png","indoor_540.png","indoor_541.png","indoor_542.png","indoor_543.png","indoor_544.png","indoor_280.png","indoor_281.png","indoor_282.png","indoor_283.png","indoor_285.png","indoor_284.png","indoor_546.png","indoor_547.png","indoor_548.png","indoor_319.png","indoor_290.png","indoor_291.png","indoor_292.png","indoor_293.png","indoor_295.png","indoor_294.png","indoor_317.png","indoor_318.png","town_0.png","indoor_329.png","indoor_300.png","indoor_301.png","indoor_302.png","indoor_303.png","indoor_305.png","indoor_304.png","indoor_327.png","indoor_328.png","town_0.png","town_0.png","indoor_311.png","indoor_312.png","indoor_313.png","indoor_314.png","town_0.png","town_0.png","indoor_337.png","indoor_338.png","indoor_339.png","town_0.png","indoor_321.png","indoor_322.png","indoor_323.png","indoor_324.png","town_0.png","town_0.png","indoor_347.png","indoor_348.png","indoor_349.png","town_0.png","indoor_331.png","indoor_332.png","indoor_333.png","indoor_334.png","indoor_335.png","indoor_336.png","town_0.png","town_0.png","town_0.png","town_0.png","indoor_341.png","indoor_342.png","indoor_343.png","indoor_344.png","indoor_345.png","indoor_346.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png","town_0.png"]]]';
    }
    /**
     * 游戏职业获取
     */
    public function jobs(){
        $job = new JobsM();
        echo ResultFormat($job->getCurr());
    }

    /**
     * 登录
     */
    public function login(){
//        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->login());
//        }else{
//            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
//        }
    }

    /**
     * 注册
     */
    public function register(){
//        if (Vcode::check($_POST['vcode'])){
            $u = new UsersM();
            echo ResultFormat($u->register());
//        }else{
//            echo ResultFormat(['code'=>-1,'msg'=>'验证码错误']);
//        }
    }

    /**
     * 退出登录 ,清除 session
     */
    public function logout(){
        unset($_SESSION);
        unset($_COOKIE);
    }

    /**
     * 分页功能
     */
    public function page() {
        $page = new Page(345);
        print_r($page->show());
    }

    /**
     * 验证码功能
     */
    public function vcode() {
        $vcode = new Vcode();
        $vcode->scode();
    }

}