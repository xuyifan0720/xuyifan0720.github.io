function popup(element_clicked)
{
	var span_element = element_clicked.getElementsByTagName("span")[0]
	span_element.classList.toggle("show");
}

$(function() {
  $('a.page-scroll').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

function switchOrder(element_clicked)
{
	// the parent div (the entire academics section)
	var div_parent = element_clicked.parentNode;

	// all the siblings of the selected div
	var children = Array.from(div_parent.childNodes);

	// the detail description of element_clicked
	var detail_element = element_clicked.getElementsByClassName("detail-text")[0];

	children = children.filter(function(div_child){
		try{
			var class_arr = Array.from(div_child.classList);
		}
		catch(err){
			return false;
		}
		if (div_child.classList.contains("academics_item"))
		{
			if (detail_element.hidden == true)
			{
				div_child.classList.toggle("removed-item");
			}
			
			return true;
		}
		return false;
	});

	if (detail_element.hidden == false)
	{
		detail_element.hidden = true; 
		element_clicked.className = "academics_item";
	}
	else 
	{
		var delayMillis = 2000; //1 second

		setTimeout(function() {
			while (div_parent.firstChild)
			{
				div_parent.removeChild(div_parent.firstChild);
			}
		}, delayMillis);

		setTimeout(function() {
			div_parent.appendChild(element_clicked);
			detail_element.hidden = false;
			element_clicked.className = "academics_item col-md-12";
			for (i=0; i < children.length; i++)
			{
				div_child = children[i];
				if (div_child != element_clicked)
				{
					div_child.classList.toggle("removed-item");
				}
				var detail_child = div_child.getElementsByClassName("detail-text")[0];
				if (div_child != element_clicked)
				{
					if (detail_child.hidden == false)
					{
						div_child.className = "academics_item";
						detail_child.hidden = true;
					}
					
					div_parent.appendChild(div_child);
					console.log(div_child);			
				}
			}
		}, delayMillis);

	}
}

function isNode(o){
  return (
    typeof Node === "object" ? o instanceof Node : 
    o && typeof o === "object" && typeof o.nodeType === "number" && typeof o.nodeName==="string"
  );
}