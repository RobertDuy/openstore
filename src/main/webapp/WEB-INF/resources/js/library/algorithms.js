var input;
var redraw;
var layouter;
var renderer;
var gF; // graph full, like g
var width1 = 200;
var height1 = 200;
var g;
var x_null;
var arrLevelSorted; // declare as global for others function
var arrr; // array for suggession
var width = 900// ;$(document).width();
var height = 800;// $(document).height() - 100;
var colorArray;
var tnode = function(id, name, isin, sex, relative, level, numbers, FID, MID,
		HWID, birthdate, diedate, avatar, tooltip, information) {
	this.id = id;
	this.name = name;
	this.isin = isin;
	this.sex = sex;
	this.relative = relative;
	this.level = level; // level is begin with 0 of root
	this.numbers = numbers; // numbers of an object with their brother
	this.FID = FID;
	this.MID = MID;
	this.HWID = HWID;
	this.birthdate = birthdate;
	this.diedate = diedate;
	this.avatar = avatar;
	this.tooltip = tooltip;
	this.information = information;
	this.group = null; // number, all children + child relative is an group
	// of an object with isin = 0;
	this.numOfGroup = 1;// number nodes in this group
	this.numInGroup = null; // numbers in this group
	this.x = null;
	this.y = null;
	this.color = null;
	this.isEnd = true; // if this node hasn't children, mean TRUE// for
	// virtual node!
	this.isVirtual = false;
	this.isAdded = false;
	this.isExpand = false;
	this.text = '-';
	this.marked = false;
}
var rel = function(hid, wid) {
	this.hid = hid;
	this.wid = wid;
}

window.onload = function() {
	var render = function(r, n) {
		/* the Raphael set is obligatory, containing all you want to display */
		var set = r.set().push(
		/* custom objects go here */
		r.rect(n.point[0] - 30, n.point[1] - 13, 60, 44).attr({
			"fill" : "#feb",
			r : "12px",
			"stroke-width" : n.distance == 0 ? "3px" : "1px"
		})).push(
				r.text(n.point[0], n.point[1] + 10, (n.label || n.id) + "\n("
						+ (n.distance == undefined ? "Infinity" : n.distance)
						+ ")"));
		return set;
	};

	// var g = new Graph();
	g = new Graph();

	gF = new Graph(); // xxxxxxxxxx

	/* modify the edge creation to attach random weights */
	g.edgeFactory.build = function(source, target) {
		var e = jQuery.extend(true, {}, this.template);
		e.source = source;
		e.target = target;
		// e.style.label = e.weight = Math.floor(Math.random() * 10) + 1;
		// e.style.label = "";
		return e;
	}
	rebuildGraph();
};
function getPosition(event) {
	var x = event.x;
	var y = event.y;

	var canvas = document.getElementById("canvas");

	x -= canvas.offsetLeft;
	y -= canvas.offsetTop;

	alert("x:" + x + " y:" + y);
};

function test(event, x, type) { // 1 mean add, other mean remove
	// window.location ="http://www.google.com.vn";
	// modyfy addGraph();
	// modify Level attribute
	$("#canvas").empty();

	g = new Graph();

	addGraph(arrLevelSorted, g, 3, 2);
	if (type == 1) {
		add_rem_Child(arrLevelSorted, g, x, 3, 1);
	} else
		add_rem_Child(arrLevelSorted, g, x, 3, 0);

	for ( var i in g.nodes) {
		if (g.nodes[i].FID) {
			g.nodes[g.nodes[i].FID].text = '+';
		}
		if (g.nodes[i].MID) {
			g.nodes[g.nodes[i].MID].text = '+';
		}
	}

	// g.removeNode(x);
	height1 = scaleY(getLevel(g) + 1);

	layouter = new Graph.Layout.Spring(g);
	renderer = new Graph.Renderer.Raphael('canvas', g, width1, height1);

	// renderer.clearr();
	layouter.layout();

	renderer.draw();
	tooltip(input);
	return "";
};

function getLevel(g) {
	var h = 0;
	for (i in g.nodes) {
		if (g.nodes[i].level > h) {
			h = g.nodes[i].level;
		}
	}
	return h;

};
function build() {
	arrr = new Array();
	for ( var i = 0; i < arrLevelSorted.length; i++) {
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			// addArray(arrr,arrLevelSorted[i][j].name);
			arrr[arrr.length] = arrLevelSorted[i][j].name + " (ID:"
					+ arrLevelSorted[i][j].id + ")";
		}
	}
}

function rebuildGraph() {
	var numberOfNode = 8; // auto set
	var maxNumberEachLevel = 0; // will set
	Graph.Level = 0; // auto set
	/*
	 * This is input array that we need
	 */
	var in_node = new Array();

	var in_rel = new Array();

	// listCurrentNode[0].lastname = "Nguyễn Đại Minh";

	in_rel = listCurrentRelative;
	input = new Array();
	in_node = new Array();
	for ( var i = 0; i < listCurrentNode.length; i++) {
		in_node[i] = new tnode("", "", "", "", "", "", "", "", "", "", "", "",
				"", "", "", "");
		setToInput(listCurrentNode[i], in_node[i]);
	}
	// alert(in_node.length);

	for ( var i = 0; i < in_rel.length; i++) {
		for ( var j = 0; j < in_node.length; j++) {
			if (in_node[j].id == in_rel[i].hid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].wid;

			}
			if (in_node[j].id == in_rel[i].wid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].hid;

			}
		}
	}

	input = in_node;

	for ( var j = 0; j < input.length; j++) {
		if (input[j].level > Graph.Level) {
			Graph.Level = input[j].level;
		}
	}
	input = in_node;
	var arrLevel = new Array();
	arrLevelSorted = new Array(); // declared as global for others function
	for ( var ii = 0; ii <= Graph.Level; ii++) {
		arrLevel[ii] = new Array();
	}
	for ( var ii1 = 0; ii1 <= Graph.Level; ii1++) {
		arrLevelSorted[ii1] = new Array();
	}

	var thisLength = 0; // length of this arrLevel[i], constructor with 0
	// var xx = new tnode();// temp tnode for sign
	for ( var jj = 0; jj < input.length; jj++) {
		// arrLevel[input[jj].level] = new tnode();
		thisLength = arrLevel[input[jj].level].length;
		// alert(thisLength);
		arrLevel[input[jj].level][thisLength] = new tnode();
		setset(input[jj], arrLevel[input[jj].level][thisLength]);
	} // have arrLevel[level][<node>]
	thisLength = 0;

	colorArray = new Array(); // this is array store color for each level
	for ( var kt = 0; kt <= Graph.Level; kt++) {
		colorArray[kt] = Raphael.getColor();
		colorArray[kt] = Raphael.getColor();

	}
	for ( var ij = 0; ij < arrLevel.length; ij++) { // clone arrLevel to
		// arrLevelSorted
		for ( var ji = 0; ji < arrLevel[ij].length; ji++) {
			arrLevelSorted[ij][ji] = new tnode();
			setset(arrLevel[ij][ji], arrLevelSorted[ij][ji]);
		}
	}
	for ( var iji = 0; iji < arrLevel.length; iji++) { // clone arrLevel to
		// arrLevelSorted
		for ( var jii = 0; jii < arrLevel[iji].length; jii++) {
			arrLevelSorted[iji][jii].color = colorArray[iji];
		}
	}

	var maxNum = 0; // number node in max-width level
	for ( var iii = 0; iii <= Graph.Level; iii++) {
		if (maxNum < arrLevel[iii].length) {
			maxNum = arrLevel[iii].length;
		}
	}

	var zzzz = x(arrLevel, arrLevelSorted);
	// alert(arrLevelSorted[2][2].MID);
	for ( var i = 0; i < arrLevelSorted.length; i++) {
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			// alert(arrLevelSorted[i][j].id);
		}
	}
	for ( var ij = 0; ij < arrLevelSorted.length - 1; ij++) {
		for ( var ji = 0; ji < arrLevelSorted[ij].length; ji++) {
			// set isEnd for tree
			for ( var jj = 0; jj < arrLevelSorted[ij + 1].length; jj++) {
				if (arrLevelSorted[ij + 1][jj].FID
						&& arrLevelSorted[ij + 1][jj].FID == arrLevelSorted[ij][ji].id) {
					// if have children, set this not to FALSE, then set
					// relative to FALSE
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
				if (arrLevelSorted[ij + 1][jj].MID
						&& arrLevelSorted[ij + 1][jj].MID == arrLevelSorted[ij][ji].id) {
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
			}
		}
	} // end set isEnd for node
	var arrFull = new Array();

	// var aa = countEnd(arrLevelSorted[4]);
	// alert(aa);
	// var countEnd = 0;
	// var id = -1;
	var thisVirtualIndex = 0;
	arrFull[0] = new Array();
	for ( var i = 0; i < arrLevelSorted[0].length; i++) {
		arrFull[0][i] = new tnode();
		setset(arrLevelSorted[0][i], arrFull[0][i]);
		// arr[0][i].isVirtual = true;
	}
	for ( var i = 0; i < arrLevelSorted.length - 1; i++) {
		arrFull[i + 1] = new Array(); // set a count(var) to new next level
		// Nếu isEnd ->addLevel tiếp
		// Nếu ko, add con.
		// vòng for dưới chạy từ 0->arLevelSorted[i+1].length + số node isEnd
		// của mức trên
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {// arFULL
			if (arrLevelSorted[i][j].isEnd) {
				if (arrLevelSorted[i][j].sex == 1) {// men
					// id, name, isin, sex, relative, level, numbers, FID, MID,
					// HWID, tooltip, information
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,arrLevelSorted[i][j].id,null,null,"","");
				} else {
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,null,arrLevelSorted[i][j].id,null,"","");
				}
				// arrFull[i+1][thisVirtualIndex].isVirtual = true;
				// arrFull[i+1][thisVirtualIndex].isEnd = true;
				// thisVirtualIndex++;
			} else {
				// tomorrow here
				// cccccccccccccccccccccccccccccccccccccccccccccccc
				for ( var k = 0; k < arrLevelSorted[i + 1].length; k++) {
					if (arrLevelSorted[i + 1][k].FID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
					if (arrLevelSorted[i + 1][k].MID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
				}
			}

		}
		thisVirtualIndex = 0;
	}
	// alert(arrLevelSorted[3][0].id);
	for ( var ijl = 1; ijl < arrFull.length; ijl++) {
		for ( var jil = 0; jil < arrFull[ijl].length; jil++) {
			// alert(arrFull[ijl][jil].id);
		}
	}// 747709366222
	var lv = Graph.Level + 1;
	lv = 2;
	width = scaleX(arrLevelSorted);
	height = scaleY(lv);
	width1 = width;
	height1 = height;
	setXY1(arrLevelSorted, width, height);

	addGraph(arrLevelSorted, g, lv, 1);
	// addGraph(arrLevelSorted,gF,lv);
	for ( var i = 1; i < arrLevelSorted.length; i++) { // for text "+" or "-"
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			if (arrLevelSorted[i][j].isAdded) {
				for ( var k = 0; k < arrLevelSorted[i - 1].length; k++) {
					if (arrLevelSorted[i][j].FID == arrLevelSorted[i - 1][k].id
							|| arrLevelSorted[i][j].MID == arrLevelSorted[i - 1][k].id)
						g.nodes[arrLevelSorted[i - 1][k].id].text = '+';
				}
			}
		}
	}
	g.nodes[1].text = '**';
	layouter = new Graph.Layout.Spring(g);
	renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

	layouter.layout();
	renderer.draw();

	// $("#1").
	redraw = function() {

		g = new Graph();
		addGraph(arrLevelSorted, g, lv, 1);

		layouter = new Graph.Layout.Spring(g);
		renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

		layouter.layout();
		renderer.draw();
	};
	clearContent = function() {
		// var cv = document.getElementById('canvas');
		// cv.empty();
		$("#canvas").empty();
	}

	arrr = new Array();

	build();

	// alert(arrr[0]);

	$("#input1").autocompleteArray(arrr);
	$("#input2").autocompleteArray(arrr);
	$("#input3").autocompleteArray(arrr);

	// sau khi do thi hoanthanh
	// khoi tao div tooltip cho moi phan tu node {address, ten}
	// bind attr
	// init tooltip

	tooltip(input);
};

function rebuildGraph1() {
	var numberOfNode = 8; // auto set
	var maxNumberEachLevel = 0; // will set
	Graph.Level = 0; // auto set
	/*
	 * This is input array that we need
	 */
	var in_node = new Array();

	var in_rel = new Array();

	// listCurrentNode[0].lastname = "Nguyễn Đại Minh";

	in_rel = listCurrentRelative;
	input = new Array();
	in_node = new Array();
	for ( var i = 0; i < listCurrentNode.length; i++) {
		in_node[i] = new tnode("", "", "", "", "", "", "", "", "", "", "", "",
				"", "", "", "");
		setToInput(listCurrentNode[i], in_node[i]);
	}
	// alert(in_node.length);

	for ( var i = 0; i < in_rel.length; i++) {
		for ( var j = 0; j < in_node.length; j++) {
			if (in_node[j].id == in_rel[i].hid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].wid;

			}
			if (in_node[j].id == in_rel[i].wid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].hid;

			}
		}
	}

	input = in_node;

	for ( var j = 0; j < input.length; j++) {
		if (input[j].level > Graph.Level) {
			Graph.Level = input[j].level;
		}
	}
	input = in_node;
	var arrLevel = new Array();
	arrLevelSorted = new Array(); // declared as global for others function
	for ( var ii = 0; ii <= Graph.Level; ii++) {
		arrLevel[ii] = new Array();
	}
	for ( var ii1 = 0; ii1 <= Graph.Level; ii1++) {
		arrLevelSorted[ii1] = new Array();
	}

	var thisLength = 0; // length of this arrLevel[i], constructor with 0
	// var xx = new tnode();// temp tnode for sign
	for ( var jj = 0; jj < input.length; jj++) {
		// arrLevel[input[jj].level] = new tnode();
		thisLength = arrLevel[input[jj].level].length;
		// alert(thisLength);
		arrLevel[input[jj].level][thisLength] = new tnode();
		setset(input[jj], arrLevel[input[jj].level][thisLength]);
	} // have arrLevel[level][<node>]
	thisLength = 0;

	for ( var ij = 0; ij < arrLevel.length; ij++) { // clone arrLevel to
		// arrLevelSorted
		for ( var ji = 0; ji < arrLevel[ij].length; ji++) {
			arrLevelSorted[ij][ji] = new tnode();
			setset(arrLevel[ij][ji], arrLevelSorted[ij][ji]);
		}
	}
	for ( var iji = 0; iji < arrLevel.length; iji++) { // clone arrLevel to
		// arrLevelSorted
		for ( var jii = 0; jii < arrLevel[iji].length; jii++) {
			arrLevelSorted[iji][jii].color = colorArray[iji];
		}
	}

	var maxNum = 0; // number node in max-width level
	for ( var iii = 0; iii <= Graph.Level; iii++) {
		if (maxNum < arrLevel[iii].length) {
			maxNum = arrLevel[iii].length;
		}
	}

	var zzzz = x(arrLevel, arrLevelSorted);
	// alert(arrLevelSorted[2][2].MID);
	for ( var i = 0; i < arrLevelSorted.length; i++) {
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			// alert(arrLevelSorted[i][j].id);
		}
	}
	for ( var ij = 0; ij < arrLevelSorted.length - 1; ij++) {
		for ( var ji = 0; ji < arrLevelSorted[ij].length; ji++) {
			// set isEnd for tree
			for ( var jj = 0; jj < arrLevelSorted[ij + 1].length; jj++) {
				if (arrLevelSorted[ij + 1][jj].FID
						&& arrLevelSorted[ij + 1][jj].FID == arrLevelSorted[ij][ji].id) {
					// if have children, set this not to FALSE, then set
					// relative to FALSE
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
				if (arrLevelSorted[ij + 1][jj].MID
						&& arrLevelSorted[ij + 1][jj].MID == arrLevelSorted[ij][ji].id) {
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
			}
		}
	} // end set isEnd for node
	var arrFull = new Array();

	// var aa = countEnd(arrLevelSorted[4]);
	// alert(aa);
	// var countEnd = 0;
	// var id = -1;
	var thisVirtualIndex = 0;
	arrFull[0] = new Array();
	for ( var i = 0; i < arrLevelSorted[0].length; i++) {
		arrFull[0][i] = new tnode();
		setset(arrLevelSorted[0][i], arrFull[0][i]);
		// arr[0][i].isVirtual = true;
	}
	for ( var i = 0; i < arrLevelSorted.length - 1; i++) {
		arrFull[i + 1] = new Array(); // set a count(var) to new next level
		// Nếu isEnd ->addLevel tiếp
		// Nếu ko, add con.
		// vòng for dưới chạy từ 0->arLevelSorted[i+1].length + số node isEnd
		// của mức trên
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {// arFULL
			if (arrLevelSorted[i][j].isEnd) {
				if (arrLevelSorted[i][j].sex == 1) {// men
					// id, name, isin, sex, relative, level, numbers, FID, MID,
					// HWID, tooltip, information
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,arrLevelSorted[i][j].id,null,null,"","");
				} else {
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,null,arrLevelSorted[i][j].id,null,"","");
				}
				// arrFull[i+1][thisVirtualIndex].isVirtual = true;
				// arrFull[i+1][thisVirtualIndex].isEnd = true;
				// thisVirtualIndex++;
			} else {
				// tomorrow here
				// cccccccccccccccccccccccccccccccccccccccccccccccc
				for ( var k = 0; k < arrLevelSorted[i + 1].length; k++) {
					if (arrLevelSorted[i + 1][k].FID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
					if (arrLevelSorted[i + 1][k].MID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
				}
			}

		}
		thisVirtualIndex = 0;
	}
	// alert(arrLevelSorted[3][0].id);
	for ( var ijl = 1; ijl < arrFull.length; ijl++) {
		for ( var jil = 0; jil < arrFull[ijl].length; jil++) {
			// alert(arrFull[ijl][jil].id);
		}
	}// 747709366222
	var lv = Graph.Level + 1;
	lv = 2;
	width = scaleX(arrLevelSorted);
	height = scaleY(lv);
	width1 = width;
	height1 = height;
	setXY1(arrLevelSorted, width, height);

	addGraph(arrLevelSorted, g, lv, 1);
	// addGraph(arrLevelSorted,gF,lv);
	for ( var i = 1; i < arrLevelSorted.length; i++) { // for text "+" or "-"
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			if (arrLevelSorted[i][j].isAdded) {
				for ( var k = 0; k < arrLevelSorted[i - 1].length; k++) {
					if (arrLevelSorted[i][j].FID == arrLevelSorted[i - 1][k].id
							|| arrLevelSorted[i][j].MID == arrLevelSorted[i - 1][k].id)
						g.nodes[arrLevelSorted[i - 1][k].id].text = '+';
				}
			}
		}
	}
	g.nodes[1].text = '**';

	g = new Graph();
	addGraph(arrLevelSorted, g, lv, 1);

	layouter = new Graph.Layout.Spring(g);
	renderer = new Graph.Renderer.Raphael('canvas', g, width, height);

	layouter.layout();
	renderer.draw();
	
	arrr = new Array();

	build();

	// alert(arrr[0]);

	$("#input1").autocompleteArray(arrr);
	$("#input2").autocompleteArray(arrr);
	$("#input3").autocompleteArray(arrr);

	// sau khi do thi hoanthanh
	// khoi tao div tooltip cho moi phan tu node {address, ten}
	// bind attr
	// init tooltip

	tooltip(input);
};

function rebuiltArrLevelSorted(){
	var in_node = new Array();

	var in_rel = new Array();

	// listCurrentNode[0].lastname = "Nguyễn Đại Minh";

	in_rel = listCurrentRelative;
	input = new Array();
	in_node = new Array();
	for ( var i = 0; i < listCurrentNode.length; i++) {
		in_node[i] = new tnode("", "", "", "", "", "", "", "", "", "", "", "",
				"", "", "", "");
		setToInput(listCurrentNode[i], in_node[i]);
	}
	// alert(in_node.length);

	for ( var i = 0; i < in_rel.length; i++) {
		for ( var j = 0; j < in_node.length; j++) {
			if (in_node[j].id == in_rel[i].hid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].wid;

			}
			if (in_node[j].id == in_rel[i].wid && in_node[j].isin == 1) {
				in_node[j].HWID = in_rel[i].hid;

			}
		}
	}

	input = in_node;

	for ( var j = 0; j < input.length; j++) {
		if (input[j].level > Graph.Level) {
			Graph.Level = input[j].level;
		}
	}
	input = in_node;
	var arrLevel = new Array();
	arrLevelSorted = new Array(); // declared as global for others function
	for ( var ii = 0; ii <= Graph.Level; ii++) {
		arrLevel[ii] = new Array();
	}
	for ( var ii1 = 0; ii1 <= Graph.Level; ii1++) {
		arrLevelSorted[ii1] = new Array();
	}

	var thisLength = 0; // length of this arrLevel[i], constructor with 0
	// var xx = new tnode();// temp tnode for sign
	for ( var jj = 0; jj < input.length; jj++) {
		// arrLevel[input[jj].level] = new tnode();
		thisLength = arrLevel[input[jj].level].length;
		// alert(thisLength);
		arrLevel[input[jj].level][thisLength] = new tnode();
		setset(input[jj], arrLevel[input[jj].level][thisLength]);
	} // have arrLevel[level][<node>]
	thisLength = 0;

	for ( var ij = 0; ij < arrLevel.length; ij++) { // clone arrLevel to
		// arrLevelSorted
		for ( var ji = 0; ji < arrLevel[ij].length; ji++) {
			arrLevelSorted[ij][ji] = new tnode();
			setset(arrLevel[ij][ji], arrLevelSorted[ij][ji]);
		}
	}
	for ( var iji = 0; iji < arrLevel.length; iji++) { // clone arrLevel to
		// arrLevelSorted
		for ( var jii = 0; jii < arrLevel[iji].length; jii++) {
			arrLevelSorted[iji][jii].color = colorArray[iji];
		}
	}

	var maxNum = 0; // number node in max-width level
	for ( var iii = 0; iii <= Graph.Level; iii++) {
		if (maxNum < arrLevel[iii].length) {
			maxNum = arrLevel[iii].length;
		}
	}

	var zzzz = x(arrLevel, arrLevelSorted);
	// alert(arrLevelSorted[2][2].MID);
	for ( var i = 0; i < arrLevelSorted.length; i++) {
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			// alert(arrLevelSorted[i][j].id);
		}
	}
	for ( var ij = 0; ij < arrLevelSorted.length - 1; ij++) {
		for ( var ji = 0; ji < arrLevelSorted[ij].length; ji++) {
			// set isEnd for tree
			for ( var jj = 0; jj < arrLevelSorted[ij + 1].length; jj++) {
				if (arrLevelSorted[ij + 1][jj].FID
						&& arrLevelSorted[ij + 1][jj].FID == arrLevelSorted[ij][ji].id) {
					// if have children, set this not to FALSE, then set
					// relative to FALSE
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
				if (arrLevelSorted[ij + 1][jj].MID
						&& arrLevelSorted[ij + 1][jj].MID == arrLevelSorted[ij][ji].id) {
					arrLevelSorted[ij][ji].isEnd = false; // alert(arrLevelSorted[ij+1][jj].id);
				}
			}
		}
	} // end set isEnd for node
	var arrFull = new Array();

	// var aa = countEnd(arrLevelSorted[4]);
	// alert(aa);
	// var countEnd = 0;
	// var id = -1;
	var thisVirtualIndex = 0;
	arrFull[0] = new Array();
	for ( var i = 0; i < arrLevelSorted[0].length; i++) {
		arrFull[0][i] = new tnode();
		setset(arrLevelSorted[0][i], arrFull[0][i]);
		// arr[0][i].isVirtual = true;
	}
	for ( var i = 0; i < arrLevelSorted.length - 1; i++) {
		arrFull[i + 1] = new Array(); // set a count(var) to new next level
		// Nếu isEnd ->addLevel tiếp
		// Nếu ko, add con.
		// vòng for dưới chạy từ 0->arLevelSorted[i+1].length + số node isEnd
		// của mức trên
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {// arFULL
			if (arrLevelSorted[i][j].isEnd) {
				if (arrLevelSorted[i][j].sex == 1) {// men
					// id, name, isin, sex, relative, level, numbers, FID, MID,
					// HWID, tooltip, information
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,arrLevelSorted[i][j].id,null,null,"","");
				} else {
					// arrFull[i+1][thisVirtualIndex] = new
					// tnode(-arrLevelSorted[i][j].id,arrLevelSorted[i][j].id.name,arrLevelSorted[i][j].isin,arrLevelSorted[i][j].sex,0,arrLevelSorted[i][j].level+1,1,null,arrLevelSorted[i][j].id,null,"","");
				}
				// arrFull[i+1][thisVirtualIndex].isVirtual = true;
				// arrFull[i+1][thisVirtualIndex].isEnd = true;
				// thisVirtualIndex++;
			} else {
				// tomorrow here
				// cccccccccccccccccccccccccccccccccccccccccccccccc
				for ( var k = 0; k < arrLevelSorted[i + 1].length; k++) {
					if (arrLevelSorted[i + 1][k].FID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
					if (arrLevelSorted[i + 1][k].MID == arrLevelSorted[i][j].id
							&& arrLevelSorted[i][j].isin == 0) {
						arrFull[i + 1][thisVirtualIndex] = new tnode();
						setset(arrLevelSorted[i + 1][k],
								arrFull[i + 1][thisVirtualIndex]);
						thisVirtualIndex++;
					}
				}
			}

		}
		thisVirtualIndex = 0;
	}
	// alert(arrLevelSorted[3][0].id);
	for ( var ijl = 1; ijl < arrFull.length; ijl++) {
		for ( var jil = 0; jil < arrFull[ijl].length; jil++) {
			// alert(arrFull[ijl][jil].id);
		}
	}// 747709366222
	var lv = Graph.Level + 1;
	lv = 2;
	width = scaleX(arrLevelSorted);
	height = scaleY(lv);
	width1 = width;
	height1 = height;
	setXY1(arrLevelSorted, width, height);
}