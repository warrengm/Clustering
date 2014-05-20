var centroids = [];

//Returns the euclidean distance / 2-norm between two points p and q
var dist = function(p, q) {
    return Math.sqrt((p.x - q.x)*(p.x - q.x) + (p.y - q.y)*(p.y - q.y));
}

var nearestCentroid = function(point, centroids) {
    nearest = 0;
    min = dist(point, centroids[0]);
    for(var i = 1; i < centroids.length; i++) {
        d = dist(point, centroids[i]);
        if(d < min) {
            nearest = i;
            min = d;
        }
    }
    return nearest;
}

var randomCentroids = function() {
    k = document.getElementById("k").value; //TODO
    centroids = [];
    for(var i = 0; i < k; i++) {
        centroids[i] = {
            "x" : i,
            "y" : i,
            "size" : 0
        }
        console.log("RC: " + centroids[i]);
        for(var j in centroids[i]){
            console.log(j);
        }
    }
    step();
    return centroids;
}

//var p = function(o) {
//    for(var v in o) [
//       // conole.log(v + ":" + o[v]);
//    }
//}

var kMeans = function() {
    if(!centroids.length){
        return randomCentroids();
    }
    
    var newClusters = [];
    for(var i = 0; i < centroids.length; i++) {
        newClusters[i] = {
            "x" : Math.random()*width,
            "y" : Math.random()*height,
            "size" : 0
        }
    }
    for(var i in data) {
        data[i].cluster = nearestCentroid(data[i], centroids);
        newClusters[data[i].cluster].x += data[i].x;
        newClusters[data[i].cluster].y += data[i].y;
        newClusters[data[i].cluster].size++;
    }
    
    for(var i in newClusters) {
        if(newClusters[i].size != 0) {
            newClusters[i].x /= newClusters[i].size;
            newClusters[i].y /= newClusters[i].size;
        }
        centroids[i] = newClusters[i];
        console.log(newClusters[i]);
        console.log("C: " + centroids[i].x);
    }
    step();
    return newClusters;
}

var step = function() {
    console.log("stepping");
    console.log("refreshing");
    svg.selectAll(".point")
        .data([]).exit().remove();
    
    svg.selectAll("circle")
        .data(data).enter().append("circle")
                .attr("r", 2)
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
                .style("fill", color)
                .attr("class", "point");
    //srefresh();
    //centroids = kMeans();
    svg.selectAll(".centroid").data([]).exit().remove();
    svg.selectAll("centroid")
        .data(centroids).enter().append("circle")
                .attr("r", 5)
                .attr("cx", function(d){ return d.x; })
                .attr("cy", function(d){ return d.y; })
                .style("fill", function(d, i){ return color(d, i); })
                .attr("class", "centroid");
}
