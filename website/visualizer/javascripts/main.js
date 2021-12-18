var m = [20, 120, 20, 120],
    w = 2160 - m[1] - m[3],
    h = 1200 - m[0] - m[2],
    i = 0,
    root;

var tree = d3.layout.tree().size([h, w]);

var diagonal = d3.svg.diagonal().projection(function(d) { return [d.y, d.x]; });

var vis = d3.select("#chart-2").append("svg:svg")
    .attr("width", w + m[1] + m[3])
    .attr("height", h + m[0] + m[2])
    .append("svg:g")
    .attr("transform", "translate(" + m[3] + "," + m[0] + ")");

var sufTree = new suffixtree();
sufTree.addtext(new String("ababbaabbbababbaabababbaabbbababbaa$"));

var sufTreeRoot = {
    "name": "root",
    "snode": sufTree.root,
    "children": [
    ]
};

sufTreeRoot.x0 = h / 2;
sufTreeRoot.y0 = 0;

function createSuffixTree() {
    var text = document.getElementById("Text1").value;

    sufTree = new suffixtree();
    sufTree.addtext(text);

    sufTreeRoot = {
        "name": "root",
        "snode": sufTree.root,
        "children": [
        ]
    };

    sufTreeRoot.x0 = h / 2;
    sufTreeRoot.y0 = 0;

    update(root = sufTreeRoot);
    recurse(root);

    toggle(root);
    toggle(root);
}

function toggleAll(d) {
    if (d.children) {
        d.children.forEach(toggleAll);
        toggle(d);
    }
}
update(root = sufTreeRoot);
recurse(root);

toggle(root);
toggle(root);

function update(source)
{
    var duration = d3.event && d3.event.altKey ? 5000 : 500;

    var nodes = tree.nodes(root).reverse();
    nodes.forEach(function(d) { d.y = d.depth * 180; });

    var node = vis.selectAll("g.node")
        .data(nodes, function(d) { return d.id || (d.id = ++i); });

    var nodeEnter = node.enter().append("svg:g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
        .on("click", function(d) { toggle(d); update(d); });

    nodeEnter.append("svg:circle")
        .attr("r", 1e-6)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeEnter.append("svg:text")
        .attr("x", function(d) { return d.children || d._children ? -10 : 10; })
        .attr("dy", ".35em")
        .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
        .text(function(d) { return d.name; })
        .style("fill-opacity", 1e-6);

    var nodeUpdate = node.transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

    nodeUpdate.select("circle")
        .attr("r", 4.5)
        .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

    nodeUpdate.select("text")
        .style("fill-opacity", 1);

    var nodeExit = node.exit().transition()
        .duration(duration)
        .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
        .remove();

    nodeExit.select("circle")
        .attr("r", 1e-6);

    nodeExit.select("text")
        .style("fill-opacity", 1e-6);

    var link = vis.selectAll("path.link")
        .data(tree.links(nodes), function(d) { return d.target.id; });

    link.enter().insert("svg:path", "g")
        .attr("class", "link")
        .attr("d", function(d) {
            var o = {x: source.x0, y: source.y0};
            return diagonal({source: o, target: o});
        })
        .transition()
        .duration(duration)
        .attr("d", diagonal);

    link.transition()
        .duration(duration)
        .attr("d", diagonal);

    link.exit().transition()
        .duration(duration)
        .attr("d", function(d) {
            var o = {x: source.x, y: source.y};
            return diagonal({source: o, target: o});
        })
        .remove();

    nodes.forEach(function(d) {
        d.x0 = d.x;
        d.y0 = d.y;
    });
}

function recurse(d) {
    if (!d.snode.isleaf) {
        d.children = new Array();

        var key;
        for (key in d.snode.children) {
            if (d.snode.children.hasOwnProperty(key)) {
                var child = d.snode.children[key];

                var length = (child.isleaf ? sufTree.text.length - 1 : child.edge.end) - child.edge.start + 1;
                var str = new String(sufTree.text.substr(child.edge.start, length));

                var cn = { name: str, snode: child };
                d.children.push(cn);

                recurse(cn);
            }
        }
    }
    d._children = null;
}

// Toggle children.
function toggle(d) {
    if (d.children) {
        d._children = d.children;
        d.children = null;
    }
    else {
        d.children = d._children;
        d._children = null;
    }
    update(d);
}
