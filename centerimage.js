// centers an img tag relative to its parent
// the parent MUST have a fixed width and height
// so in the case of 
// div a img {}
// ensure the <a> height is manually defined
// instead of being determined by the img it contains.
function centerImage( image )
{
	var $image = $(image);

	var area = $image.parent();
	
	var $areaW = area.width();
	var $areaH = area.height();
	
	var $imageWidth = image.width;
	var $imageHeight = image.height;

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
}