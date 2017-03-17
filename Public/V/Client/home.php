<?php include 'head.php';?>

<div class="container">
    <div class="panel panel-primary">
    	  <div class="panel-heading">
    			<h3 class="panel-title"><?php echo $data['USER_NAME'];?></h3>
    	  </div>
    	  <div class="panel-body">
              <div style="width:<?php echo $data['CHAR_WIDTH'];?>px;height:<?php echo $data['CHAR_HEIGHT'];?>px;background-image:url(images/charasets/<?php echo $data['CHARASET'];?>)"></div>
    	  </div>
    </div>
    <img src="#" class="img-responsive" alt="Image">


</div><!-- /.container -->

<?php include 'foot.php';?>