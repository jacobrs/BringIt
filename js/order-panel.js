$(function () {
  // Grab the template script
  var theTemplateScript = $("#order-panel").html();

  // Compile the template
  var theTemplate = Handlebars.compile(theTemplateScript);

  // Define our data object
  var context={
    "description": {
      "escaped": "Using {{}} brackets will result in escaped HTML:",
      "unescaped": "Using {{{}}} will leave the context as it is:"
    },
    "example": "<button> Hello </button>"
  };

  // Pass our data to the template
  var theCompiledHtml = theTemplate(context);

  // Add the compiled html to the page
  $('order-tile').html(theCompiledHtml);
});
