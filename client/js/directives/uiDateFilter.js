angular.module('novaVida').filter('meuFiltro', function() {

  const parseDate = ( date ) => {
    const parts = date.split('/');
    return new Date( parts[2], parts[1]-1, parts[0] )
  }

  return ( itens, de, ate ) => {
    const dataInicial = parseDate( de );
    const dataFinal = parseDate( ate );
    const arrayParaRetornar = [];
    for ( let i = 0; i < itens.length; i++ ) {
      const tf = new Date( itens[i].data );

      if( tf > dataInicial && tf < dataFinal ){
        arrayParaRetornar.push( itens[i] );
      }
    }
    return arrayParaRetornar;
  }
});