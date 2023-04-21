define([
  'dojo/_base/declare', 
  'dojo/dom',
  "dojo/on",
  "dojo/_base/lang",

  "esri/tasks/QueryTask",
  "esri/tasks/query",

  "esri/SpatialReference",
  "esri/graphic",
  "esri/geometry/Extent",

  "esri/symbols/SimpleLineSymbol",

  "esri/map",
  "esri/layers/FeatureLayer",
  "esri/dijit/PopupTemplate",

  'jimu/BaseWidget'
],
  function(
    declare, 
    dom,
    on,
    lang,

    QueryTask,
    Query,

    SpatialReference,
    Graphic,
    Extent,

    SimpleLineSymbol,

    map,
    FeatureLayer,
    PopupTemplate,

    BaseWidget
    ) {
    return declare([BaseWidget], {

      baseClass: 'jimu-widget-customwidget',
      
      postCreate: function(){
        this.currentLayer = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[2].id)
        console.log("Map PTC",this.map);
        console.log("Layer PTC",this.currentLayer);
        
      },
      startup: function(){
        console.log("Layer STP",this.currentLayer);
      },
      
      filtrarMuestreo: function() {
        // Definir expresiones
        var or = ` OR `;
        var and = ` AND `;
        var pto_muestreo = `	Pto_Muestreo = '`;
        var fch_muestreo = `F`;
        
        var exp_fecha= ` = [*]`;
        var expression= ``;
        var valor= `Hola`;


        // Obtener Punto Muestreo de texto
        var punto_muestreo = this.ptoMuestreo.value;
        console.log("m", punto_muestreo)
        pto_muestreo = pto_muestreo + punto_muestreo + `'`;
        console.log("puntofinal", pto_muestreo)

        // Obtener Fecha de texto
        var fecha_muestreo = this.fch_muestreo.value;
        console.log("fecha", fch_muestreo)

        var field_fecha= fch_muestreo + fecha_muestreo
        console.log("query", field_fecha)

        fch_muestreo = fch_muestreo + fecha_muestreo + exp_fecha 
        console.log("fechafinal", fch_muestreo)

        expression = pto_muestreo + and + fch_muestreo
        console.log("Final", expression)


        // Definir la URL de la capa y el campo a consultar
        var campo = field_fecha;
        var dist = this.map.getLayer(this.map.itemInfo.itemData.operationalLayers[2].id)
        console.log("dist", dist)


        // Crear una instancia de QueryTask
        var queryTask = new QueryTask(dist.url);

        // Definir los parámetros de la consulta
        var query = new Query();
        query.returnGeometry = false;
        query.outFields = [campo];
        query.where = pto_muestreo; // Consulta para todos los registros


        // Ejecutar la consulta
        queryTask.execute(query, function(resultado){
          // Obtener el valor del campo del primer registro
          var valorCampo = resultado.features[0].attributes[campo];

          // Utilizar el valor del campo
          console.log("El valor del campo " + campo + " es: " + valorCampo);
          document.getElementById("resultado").innerHTML = valorCampo;
        });

      },

      refresh: function (){
        document.getElementById("resultado").innerHTML = '';
      }

    });
  });