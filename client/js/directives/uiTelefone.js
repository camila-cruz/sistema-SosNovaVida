angular.module('novaVida').directive( 'uiTelefone', function() {
  return {
    require: 'ngModel',
    link: ( scope, element, attrs, ctrl ) => {

      const _formatTelefone = ( telefone ) => {
        telefone = telefone.replace(/[^0-9]+/g, '');
        
        if ( telefone.length > 2 ) {
          telefone = "(" + telefone.substring( 0,2 ) + ") " + telefone.substring( 2 );
        }

        if ( telefone.length > 10 ) {
          telefone = telefone.substring( 0,10 ) + '-' + telefone.substring( 10, 14 );
        }

        return telefone;
      };

      element.bind('keyup', () => {
        ctrl.$setViewValue( _formatTelefone( ctrl.$viewValue ) );
        ctrl.$render();
      })
    }
  };
});