var p1 = new Array();
var p2 = new Array();
function findRelative(){

	for(var i = 0; i < arrLevelSorted.length; i++){
		for(var j = 0; j < arrLevelSorted[i].length; j++){
			arrLevelSorted[i][j].isAdded = false;
		}
	}
	
	var input1 = document.getElementById("input1").value;
	var input2 = document.getElementById("input2").value;
 //pre-process input data to id
	var input1ID="";
	var index11 = input1.indexOf(":")+1;
	var index12 = input1.indexOf(")")-1;
	for(var i = index11;i<=index12; i++ ){input1ID+= input1.charAt(i); }
	input1 = input1ID;
	
	var input2ID="";
	var index21 = input2.indexOf(":")+1;
	var index22 = input2.indexOf(")")-1;
	for(var i = index21;i<=index22; i++ ){input2ID+= input2.charAt(i); }
	input2 = input2ID;
	var bt = document.getElementById("find_rel");
	if(input1!=""&&input2!=""){
		
	//	bt.attr({disable:"enable"});
	}
//	bt.hide(true); //kxxx
	//TO DO : implement algorithm to find relative tree
	// we also add a link to root, for user easy to exapand tree again

	addArray(p1,input1);
	addArray(p2,input2);
	var ii = input1; 
	var jj = input2; // two variable to keep id that have just catched
	var father1 = input1;
	var father2 = input2; 
	
	for(var i = 0; i < arrLevelSorted.length; i++){
		for(var j = 0; j < arrLevelSorted[i].length; j++){
			if(arrLevelSorted[i][j].id==ii){
				arrLevelSorted[i][j].marked = true;
			}
			if(arrLevelSorted[i][j].id==jj){
				arrLevelSorted[i][j].marked = true;
			}
		}
	}
	
	
	for(var i = arrLevelSorted.length - 1; i >= 0 ; i--){   //run from leaf to root
	ii = father1; //alert(ii);
	jj = father2;
		for(var j = 0; j < arrLevelSorted[i].length; j++){
			if(arrLevelSorted[i][j].id == ii){  //keep this node		
				if(arrLevelSorted[i][j].HWID){ 
					for(var k = 0; k<arrLevelSorted[i].length; k++){
						if(arrLevelSorted[i][k].id == arrLevelSorted[i][j].HWID){
							arrLevelSorted[i][k].isAdded = true;
							ii = arrLevelSorted[i][k].id;
							if(arrLevelSorted[i][k].isin){
								father1 = arrLevelSorted[i][k].MID; 
							}
							else father1 = arrLevelSorted[i][k].FID; 
						}
						if(arrLevelSorted[i][k].HWID==ii){
							arrLevelSorted[i][k].isAdded = true;
						}
					}
					
				}
				else{
					if(arrLevelSorted[i][j].isin&&arrLevelSorted[i][j].MID){
						father1 = arrLevelSorted[i][j].MID; 
					}
					else {father1 = arrLevelSorted[i][j].FID;} 
					
					arrLevelSorted[i][j].isAdded = true;
					for(var k = 0; k<arrLevelSorted[i].length; k++){
						if(arrLevelSorted[i][k].HWID==ii){
							arrLevelSorted[i][k].isAdded = true;
						}
					}
				}
			} // end for input1
			//begin input2
			if(arrLevelSorted[i][j].id == jj){  //keep this node		
				if(arrLevelSorted[i][j].HWID){ 
					for(var k = 0; k<arrLevelSorted[i].length; k++){
						if(arrLevelSorted[i][k].id == arrLevelSorted[i][j].HWID){
							arrLevelSorted[i][k].isAdded = true;
							jj = arrLevelSorted[i][k].id;
							if(arrLevelSorted[i][k].isin){
								father2 = arrLevelSorted[i][k].MID; 
							}
							else father2 = arrLevelSorted[i][k].FID; 
						}
						if(arrLevelSorted[i][k].HWID==jj){
							arrLevelSorted[i][k].isAdded = true;
						}
					}
					
				}
				else{
					if(arrLevelSorted[i][j].isin&&arrLevelSorted[i][j].MID){
						father2 = arrLevelSorted[i][j].MID; 
					}
					else father2 = arrLevelSorted[i][j].FID; 
					arrLevelSorted[i][j].isAdded = true;
					for(var k = 0; k<arrLevelSorted[i].length; k++){
						if(arrLevelSorted[i][k].HWID==jj){
							arrLevelSorted[i][k].isAdded = true;
						}
					}
				}
			}
		}
	}

	$("#canvas").empty();

		g=new Graph();
		
		graphIn = [];
	//	arrLevelSorted[0][1].isAdded = true;
	//	alert(arrLevelSorted[0][1].HWID);
		addGraph(arrLevelSorted,g,3,2);
	/*	if(type == 1){
			add_rem_Child(arrLevelSorted,g,x,3,1); 
		}
		else add_rem_Child(arrLevelSorted,g,x,3,0);
		*/
		
			for(var i in g.nodes){
				if(g.nodes[i].FID){
					g.nodes[g.nodes[i].FID].text ='+';
				}
				if(g.nodes[i].MID){
					g.nodes[g.nodes[i].MID].text ='+';
				}
			}
	
		//g.removeNode(x);
	height1 = scaleY(getLevel(g)+1);

	layouter =  new Graph.Layout.Spring(g);
    renderer =  new Graph.Renderer.Raphael('canvas', g, width1, height1);
	
//	renderer.clearr();
    layouter.layout();
   
	renderer.draw();
	
	tooltip(input);

   return "";

}