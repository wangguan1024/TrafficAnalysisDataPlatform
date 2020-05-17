function changeVideo(url){
    var s='<EMBED style="FILTER: xray()" src="$url$" width=3600px height=300px type=audio/mpeg volume="0" loop="-1">';

    document.getElementById("video").innerHTML=s.replace('$url$',url);
};