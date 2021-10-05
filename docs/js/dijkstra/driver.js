class Map {
    constructor(map_matrix) {
        this.matrix = map_matrix;
        this.node_num = map_matrix.length;
    }
}

function Dijkstra(map, src) {
    var visited = [];
    var dist_from_src = [];
    var prev_vertex = [];
    var vertices_num = map.node_num;
    for (var i = 0; i < vertices_num; ++i) {
        dist_from_src.push(Infinity);
    }
    var cur_visit = src;
    dist_from_src[src] = 0;
    while (visited.length < vertices_num && 
           visited.indexOf(cur_visit) == -1) {
        // visit current vertex
        var base_dist = dist_from_src[cur_visit];
        visited.push(cur_visit);
        
        // Update dist_from_src table
        for (var i = 0; i < vertices_num; ++i) {
            var dist = map.matrix[cur_visit][i] + base_dist;
            if (dist < dist_from_src[i]) {
                dist_from_src[i] = dist;
                prev_vertex[i] = cur_visit;
            }
        }

        // find next vertex to visit
        var min_dist_to_src = new Object;
        min_dist_to_src.idx = -1; 
        min_dist_to_src.dist = Infinity;
        for (var i = 0; i < vertices_num; ++i) {
            if (visited.indexOf(i) != -1) {
                continue;
            }
            if (dist_from_src[i] < min_dist_to_src.dist) {
                min_dist_to_src.idx = i;
                min_dist_to_src.dist = dist_from_src[i];
            }
        }
        cur_visit = min_dist_to_src.idx;
    }
    return [dist_from_src, prev_vertex];
}

function GeneratePath(prev_vertices) {
    var pathes = [];
    var v_num = prev_vertices.length;
    var src = -1;
    for (var i = 0; i < v_num; ++i) {
        if (prev_vertices[i] === undefined) {
            src = i;
            continue;
        }
        var path = [];
        var cur_v = i;
        do {
            path.push(cur_v + 1);
            cur_v = prev_vertices[cur_v];
        } while (prev_vertices[cur_v] != undefined);
        pathes.push(path);
    }
    if (src === -1) {
        src = v_num;
    }
    for (var i in pathes) {
        pathes[i].push(src + 1);
    }
    return pathes;
}

// fill the table of distances
function CalcDists() {
    var data_tb = document.getElementById("data"); 

    for (var i = 0; i < map1.matrix.length; ++i) {
        var dists = Dijkstra(map1, i)[0];
        for (j = 0; j < map1.matrix.length; ++j) {
            data_tb.rows[i + 1].cells[j + 1].innerHTML = dists[j];
        }
    }
}

// fill the table shortest pathes
function FindPath(dists, pathes) {
    var path_tb = document.getElementById("path");
    var path_num = pathes.length;
    // var src = pathes[0][pathes[0].length - 1];
    for (var i = 0; i < path_num; ++i) {
        var dest = pathes[i][0];
        path_tb.rows[i + 1].cells[0].innerHTML = dest;
        path_tb.rows[i + 1].cells[1].innerHTML = pathes[i].reverse();
        path_tb.rows[i + 1].cells[2].innerHTML = dists[dest - 1];
    }
}

function StandInCircle(center_x, center_y, r, x, y) {
    var dist = Math.sqrt((center_x - x) * (center_x - x) + 
                         (center_y - y) * (center_y - y));
    if (dist < r) {
        return true;
    } else {
        return false;
    }
}

// Canvas to draw map
function DrawText(ctx, txt, x, y) {
    ctx.font = "10px Arial";
    ctx.fillStyle = "#000000";
    ctx.textAlign = "center";
    ctx.fillText(txt, x, y + 4);
}

function CreateCircle() {
    var Circle = new Object;
    Circle.x = 0;
    Circle.y = 0;
    Circle.r = 0;
    Circle.txt = "";
    Circle.mouse_on_me = false;
    Circle.Linked = new Array;
    Circle.DrawOn = function(ctx) {
        ctx.beginPath();
        ctx.fillStyle = "#a8d8cd";
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        DrawText(ctx, this.txt, this.x, this.y);
    };
    Circle.DrawOnWithColor = function(ctx, color) {
        ctx.beginPath();
        ctx.fillStyle = color;
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.fill();
        DrawText(ctx, this.txt, this.x, this.y);
    }
    Circle.DrawLinkOn = function(ctx) {
        var x_start = this.x;
        var y_start = this.y;
        for (i = 0; i < this.Linked.length; i++) {
            var x_end = this.Linked[i].obj.x;
            var y_end = this.Linked[i].obj.y;
            ctx.beginPath();
            ctx.moveTo(x_start, y_start);
            ctx.lineTo(x_end, y_end);
            ctx.strokeStyle = "#2a484e";
            ctx.stroke();
        }
    };
    Circle.DrawLinkWithWeightOn = function(ctx) {
        var x_start = this.x;
        var y_start = this.y;
        for (i = 0; i < this.Linked.length; i++) {
            var x_end = this.Linked[i].obj.x;
            var y_end = this.Linked[i].obj.y;
            var weight = this.Linked[i].w;
            ctx.beginPath();
            ctx.moveTo(x_start, y_start);
            ctx.lineTo(x_end, y_end);
            ctx.strokeStyle = "#2a484e";
            ctx.stroke();
            var w_x = (x_end + x_start) / 2;
            var w_y = (y_end + y_start) / 2;
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(w_x - 10, w_y - 10, 20, 20);
            DrawText(ctx, weight, w_x, w_y);
        }
    }
    return Circle;
}

var vertices = [];
const init_x = 250;
const init_y = 50;
const init_r = 20;

function DrawMap(map, ctx, v_positions) {
    var vertices_num = map.matrix.length;
    for (var i = 0; i < vertices_num; ++i) {
        var circle_tmp = CreateCircle();
        circle_tmp.txt = i + 1;
        circle_tmp.x = v_positions[i]["x"];
        circle_tmp.y = v_positions[i]["y"];
        circle_tmp.r = init_r;
        vertices.push(circle_tmp);
    }

    // Link linked vertices
    for (var i = 0; i < vertices_num; ++i) {
        var linked_idx = 0;
        for (var j = 0; j < vertices_num; ++j) {
            if (i == j || map.matrix[i][j] === Infinity) {
                continue;
            }
            vertices[i].Linked[linked_idx] = new Object;
            vertices[i].Linked[linked_idx].obj = vertices[j];
            vertices[i].Linked[linked_idx].w = map.matrix[i][j];
            linked_idx++;
        }
    }

    console.log(vertices);

    // Draw links
    for (var i = 0; i < vertices_num; ++i) {
        vertices[i].DrawLinkWithWeightOn(ctx);
    }
    
    // Draw vertices
    for (var i = 0; i < vertices_num; ++i) {
        vertices[i].DrawOn(ctx);
    }
}

var c = document.getElementById("myCanvas");
var ctx = c.getContext("2d");

var map1 = new Map([
    [       0,       50, Infinity,       40,       25,       10],
    [      50,        0,       15,       20, Infinity,       25],
    [Infinity,       15,        0,       10,       20, Infinity],
    [      40,       20,       10,        0,       10,       25],
    [      25, Infinity,       20,       10,        0,       55],
    [      10,       25, Infinity,       25,       55,        0]
])


var pts_positions = [
    {"x": init_x, "y": init_y + 70},
    {"x": init_x, "y": init_y + 170},
    {"x": init_x + 87, "y": init_y + 20},
    {"x": init_x + 87 * 2, "y": init_y + 70},
    {"x": init_x + 87 * 2, "y": init_y + 170},
    {"x": init_x + 87, "y": init_y + 220}
];
const v_num = pts_positions.length;

DrawMap(map1, ctx, pts_positions);

c.onmousedown = function(e) {
    for (var i = 0; i < v_num; ++i) {
        if (StandInCircle(pts_positions[i]["x"], pts_positions[i]["y"], init_r,
                e.offsetX, e.offsetY)) {
            vertices[i].DrawOnWithColor(ctx, "#ce4a50");
            vertices[i].mouse_on_me = true;
            var dists = Dijkstra(map1, i)[0];
            var pv = Dijkstra(map1, i)[1];
            var pv_g = GeneratePath(pv);
            FindPath(dists, pv_g);
        }
        if (vertices[i].mouse_on_me &&
            !StandInCircle(pts_positions[i]["x"], pts_positions[i]["y"], init_r,
                e.offsetX, e.offsetY)) {
            vertices[i].DrawOn(ctx);
            vertices[i].mouse_on_me = false;
        }
    }    
}