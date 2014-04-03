'use strict';

angular.module('angularJspracticesApp')
  .directive('youtube', function () {
    return {
      restrict: 'A',
      link: function postLink(scope, element, attrs) {
      	// When the directive is linked into the DOM, let's setup the content.
      	// element gives us access to the DOM where the directive is applied.
      	// We can use it in ways similar to how you manipulate elements in jQuery.
      	// attrs provides a list of properties that are set to the same element as
      	// the directive.  So we can retrieve the youtube id set to it and use it
      	// to generate the appropriate video embed.
        element.html('<iframe width="538" height="303" src="//www.youtube.com/embed/'+attrs['youtube']+'" frameborder="0" allowfullscreen></iframe>');
      }
    };
  });
