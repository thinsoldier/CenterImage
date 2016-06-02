//You need an anonymous function to wrap around your function to avoid conflict
(function($){

  //Attach this new method to jQuery
  $.fn.extend({ 

    //This is where you write your plugin's name
    centerImage: function() {

      //Iterate over the current set of matched elements
      return this.each(function( index, element) {

        //code to be inserted here
        centerImage( element );

      });
  	}
  });
	
//pass jQuery to the function, 
//So that we will able to use any valid Javascript variable name 
//to replace "$" SIGN. But, we'll stick to $, I like dollar sign.
})(jQuery);



// Centers an <img> tag relative to its parent
// the parent MUST have a fixed width and height.
// So in the case of 
// div a img {}
// ensure the <a> height is manually defined
// instead of being determined by the image it contains.
function centerImage( image )
{
	var $ = jQuery;
	if(image.tagName.toLowerCase() != 'img'){ return; }

// 	image.style.position = 'relative';
// 	image.style.top = '0px';
// 	image.style.left = '0px';
// 	image.style.transition = 'top 1s, left 1s';



	var $image = $(image);
	
	// re re-applying centering to something previously centered we need to clear out and start from scratch.
	$image.removeAttr('style');
	$image.removeClass('portrait landscape square tooNarrow tooShort');

	// A0
	// Measure the size at which the image is displayed,
	// not the intrinsic size of the image file itself.
	var $imageWidth  = image.clientWidth;
	var $imageHeight = image.clientHeight;
	
	// console.log('1st W H', $imageWidth, $imageHeight, image);

	var area = $image.parent();
	// Size of the image's parent element.
	// Only works if the size is explicitly set in pixels or 100% of some grandparent element.
	var $areaW = area.width();
	var $areaH = area.height();

	// A1
	// Measure and set the orientation of the image: portrait or landscape
	if( $imageWidth  < $imageHeight ){ $image.addClass('portrait'); }
	if( $imageWidth  > $imageHeight ){ $image.addClass('landscape'); }
	if( $imageWidth  === $imageHeight ){ $image.addClass('square'); }
	
	// B1
	// Assigning the classes might have changed
	// the width and height of some images
	// so re-measure the image size before centering.
	$imageWidth  = image.clientWidth;
	$imageHeight = image.clientHeight;
	
	// console.log('2nd W H', $imageWidth, $imageHeight, image);

	
	// A2
	// Determine and indicate if it is smaller than the parent area.
	if( $imageWidth  < $areaW ){ $image.addClass('tooNarrow'); }
	if( $imageHeight < $areaH ){ $image.addClass('tooShort'); }
	
	// B2
	// Assigning the classes might have changed
	// the width and height of some images
	// so re-measure the image size before centering.
	$imageWidth  = image.clientWidth;
	$imageHeight = image.clientHeight;
	
	// console.log('3rd W H', $imageWidth, $imageHeight, image);
	
	
	// Position the image in the center of its parent.
	var $left = 0;
	if( $areaW < $imageWidth )
	{
		var $left = $areaW - $imageWidth;
		$left = Math.round($left / 2);
	}
	
	var $top = 0;
	if($areaH < $imageHeight )
	{
		var $top = $areaH - $imageHeight;	
		$top = Math.round($top /2);
	}
	
	image.style.position = 'relative';
	image.style.top = $top + 'px';
	image.style.left = $left + 'px';
	
	jQuery.event.trigger({
			type: "centerImageFinished",
			image: image,
			time: new Date()
		});
}