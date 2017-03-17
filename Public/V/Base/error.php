<?php include 'head.php';?>

<div class="container">

    <div class="starter-template">
        <div class="alert alert-warning">
        	<button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>
        	<h1><strong>&gt;_&lt; 出错啦 &gt;_&lt;</strong></h1>
            <p style="text-align: left"><?php print_r($data['err']); ?></p>
            <hr>
            <h3>堆栈调用明细</h3>
            <p style="text-align: left">

                <?php foreach ($data['traces'] as $k => $v){?>
                    <?php if (isset($v['file'])){
                        echo '==> '.$k.'<br>File : '.$v['file'].'<br>Line : '.$v['line'].'<br>Function : '.$v['function'];}else{ print_r($v);}?>
                        <br><br>
                <?php } ?>
            </p>
        </div>

    </div>

</div><!-- /.container -->

<?php include 'foot.php';?>
