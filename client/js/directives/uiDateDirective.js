angular.module('novaVida').directive('uiDate', function() {
  return {
    require: 'ngModel',
    link: function ( scope, element, attrs, ctrl ) {
      const _formatDate = ( date ) => {
        date = date.replace(/[^0-9]+/g, "");
        if ( date.length > 2 ) {
          date = date.substring( 0, 2 ) + '/' + date.substring( 2 );
        }

        if ( date.length > 5 ) { 
          date = date.substring( 0, 5 ) + '/' + date.substring( 5, 9 );
        }
        return date;
      };

      element.bind('keyup', () => {
        ctrl.$setViewValue(_formatDate( ctrl.$viewValue) );
        ctrl.$render();
      })

      ctrl.$parsers.push( value => {
        if ( value.length === 10 ) {
          const dateArray = value.split('/');
          console.log( dateArray );
          return new Date( dateArray[2], dateArray[1]-1, dateArray[0] )
        }
      });
    }
  }
});