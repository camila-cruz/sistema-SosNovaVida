angular.module("novaVida").config(function ($httpProvider) {
	$httpProvider.interceptors.push("timestampInterceptor");
});