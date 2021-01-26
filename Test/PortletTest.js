/**
 *@NApiVersion 2.x
 *@NScriptType Portlet
 */
define([],
    function() {
        function render(params) {
            params.portlet.title = 'Weather';
          
            var content = '<script language="javascript">var wwidth = this.document.id;console.log (wwidth);</script><iframe id="baron-widget-frame-map-desktop-h" name="map-widget" src="https://staticbaronwebapps.velocityweather.com/digitial_wx/pages/n2.adaptive/map/index.html?initjson=https://staticbaronwebapps.velocityweather.com/digitial_wx/widgets/dcms/02fc1630-7849-4959-ba05-64c7ea15dd2a/live/init.js&amp;initjsonvar=initdata" marginwidth="0" marginheight="0" height="700" width="wwidth" frameborder="0" scrolling="no" style="z-index: 1; position: static; top: 0; left: 0; float: left;"></iframe>';
            params.portlet.html = content;
        }
        return {
            render: render
        };
    });