
    // map initialization
    var map = L.map('map').setView([8.9900, 76.400],8);
    // osm layer
   var osm = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community'
});
// osm.addTo(map);
// satellite
var Esri_WorldImagery = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
});
// Esri_WorldImagery.addTo(map)
var Esri_WorldStreetMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012'
});
Esri_WorldStreetMap.addTo(map)

//LAYER GROUP//
 var Stadium = L.layerGroup();
 var swimming = L.layerGroup();
 var Tennis = L.layerGroup();
 var ShootingRange  = L.layerGroup();

 
 const icon_swim = L.icon({
     iconUrl: 'blue.png',
     iconSize:[45,45]
    
 })
 const pointer = L.icon({
     iconUrl: 'pointer.png',
    iconSize:[60,60]
    
})

const icon_stadium = L.icon({
    iconUrl: 'white.png',
    iconSize:[40,40]
    
})  

const icon_shooting = L.icon({
    iconUrl: 'greenn.png',
    iconSize:[40,40]
    
})  

const icon_tennis = L.icon({
    iconUrl: 'red.png',
    iconSize:[40,40]
    
})

$(document).ready(function(){
    $.ajax({
        url: "db.php",
        dataType: "json",
      }).done(function(data) {
        console.log(data[0]);
        $.each(data, function(i, item) {
        var resp = data[i];
        var id= resp.id;
        var name= resp.name;
        var address= resp.address;
        var lat= resp.lat;
        var lng= resp.lng;
        var type= resp.type;
        var layerGrp,markerIcon;
        var image= resp.image;
        switch(type){
            case "Stadium":layerGrp = Stadium;markerIcon=icon_stadium;break;
            case "swimming":layerGrp = swimming;markerIcon=icon_swim;break;
            case "Tennis":layerGrp = Tennis;markerIcon=icon_tennis;break;
            case "ShootingRange":layerGrp = ShootingRange;markerIcon=icon_shooting;break;
        }
        var JSP=L.marker([lat, lng],{
            icon: markerIcon});
        var popup = JSP.bindPopup('<h3>'+name+'</h3>').on('mouseover', function (e) {
            this.openPopup()
        });
        JSP.on('mouseout', function (e) {
            this.closePopup();
        });
        popup.addTo(map)
        JSP.addTo(layerGrp).on('click', function(e) { 
        var v = document.getElementById("popup");

            v.style.display="block";
        document.getElementById("st-name").innerHTML = name;
        document.getElementById("st-address").innerHTML = "<h5>"+address+"</H5>";
        document.getElementById("st-contact").innerHTML = "<B>CONTACT:</B> 04712326644";  
        document.getElementById("st-timing").innerHTML = "<b>TIME:</b><BR><P>Monday  Closed <br> Tuesday 6am–8pm <br>Wednesday 6am–8pmThursday 6am–8pm <br>Friday 6am–8pm <br>Saturday 6am–8pm <br>Sunday  6am–8pm <br></p> ";
        // var imageHtml = `<img src="`+image_path+`">`;
        document.getElementById("st-img").src=image; 
        console.log(image)
       
        });
    });
      });
});


var baseMaps = {
    "map": osm,
    "street map":Esri_WorldStreetMap,
   "satellite":Esri_WorldImagery

};

var overlayMaps = {
   "Stadium": Stadium,
   "swimming" : swimming,
   "Tennis": Tennis,
   "Shooting range":ShootingRange
};

var layerControl = L.control.layers(baseMaps, overlayMaps).addTo(map);

function closePopup(){
    document.getElementById("popup").style.display = "none";
}
