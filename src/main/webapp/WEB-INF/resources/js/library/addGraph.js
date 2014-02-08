var graphIn = new Array(); //what will in graph for draw

var addGraph = function(arrLevelSorted,g,lv,type){ // type == 1 is add all to level, no node marked ! justcall at onload()
	if(type == 1){ 
		for(var ijk = 0; ijk< lv/*arrLevelSorted.length*/; ijk++){ 
			for(var jik = 0; jik<arrLevelSorted[ijk].length; jik++){
			g.addNode(String(arrLevelSorted[ijk][jik].id),
							{name:arrLevelSorted[ijk][jik].name,
							x:arrLevelSorted[ijk][jik].x, 
							y:arrLevelSorted[ijk][jik].y, 
							level:arrLevelSorted[ijk][jik].level, 
							sex:arrLevelSorted[ijk][jik].sex, 
							FID:arrLevelSorted[ijk][jik].FID,
							MID:arrLevelSorted[ijk][jik].MID,
							HWID:arrLevelSorted[ijk][jik].HWID, 
							color:arrLevelSorted[ijk][jik].color,
							group:arrLevelSorted[ijk][jik].group,
							numInGroup:arrLevelSorted[ijk][jik].numInGroup,
							isEnd:arrLevelSorted[ijk][jik].isEnd,
							isin:arrLevelSorted[ijk][jik].isin,
							isExpand:arrLevelSorted[ijk][jik].isExpand,
							text:arrLevelSorted[ijk][jik].text,
							marked:arrLevelSorted[ijk][jik].marked
							}
					);
					arrLevelSorted[ijk][jik].isAdded = true;
					addArray(graphIn,arrLevelSorted[ijk][jik].id);
			}
		}	
		for(var ijl = 0; ijl< lv/*arrLevelSorted.length*/; ijl++){ 
			for(var jil = 0; jil<arrLevelSorted[ijl].length; jil++){
		
				if(arrLevelSorted[ijl][jil].MID&&!arrLevelSorted[ijl][jil].FID){ // connect with mother only and this is have ISIN = 1 // mean OUT
					g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].MID.toString()));//countEdge++;
				}
				else if(arrLevelSorted[ijl][jil].FID&&!arrLevelSorted[ijl][jil].MID){
					g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].FID.toString()));	
				}
				else if(arrLevelSorted[ijl][jil].FID&&arrLevelSorted[ijl][jil].MID){ 
					if(arrLevelSorted[ijl][jil].isin == 0){
						g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].MID.toString()));
					}
					else g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].FID.toString()));	
				
				}
				//BEGIN ADD RELATIVE
				if(arrLevelSorted[ijl][jil].HWID)
				{
					g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].HWID.toString()));
				}
			
			}
		}
	}
	else if(type == 2){ // oh men, because, I split this case to add_rem_child function, this just called when findRelative!
		for(var ijk = 0; ijk< arrLevelSorted.length; ijk++){ 
			for(var jik = 0; jik<arrLevelSorted[ijk].length; jik++){
			if(arrLevelSorted[ijk][jik].isAdded == true){
				g.addNode(String(arrLevelSorted[ijk][jik].id),
								{name:arrLevelSorted[ijk][jik].name,
								x:arrLevelSorted[ijk][jik].x, 
								y:arrLevelSorted[ijk][jik].y, 
								level:arrLevelSorted[ijk][jik].level, 
								sex:arrLevelSorted[ijk][jik].sex, 
								FID:arrLevelSorted[ijk][jik].FID,
								MID:arrLevelSorted[ijk][jik].MID,
								HWID:arrLevelSorted[ijk][jik].HWID, 
								color:arrLevelSorted[ijk][jik].color,
								group:arrLevelSorted[ijk][jik].group,
								numInGroup:arrLevelSorted[ijk][jik].numInGroup,
								isEnd:arrLevelSorted[ijk][jik].isEnd,
								isin:arrLevelSorted[ijk][jik].isin,
								isExpand:arrLevelSorted[ijk][jik].isExpand,
								text:arrLevelSorted[ijk][jik].text,
								marked:arrLevelSorted[ijk][jik].marked
								}
						);
					//	alert(arrLevelSorted[ijk][jik].id);
					arrLevelSorted[ijk][jik].isAdded = true;
					addArray(graphIn,arrLevelSorted[ijk][jik].id);
				}
			}
		}
	
		for(var ijl = 0; ijl< arrLevelSorted.length; ijl++){ 
			for(var jil = 0; jil<arrLevelSorted[ijl].length; jil++){
				if(checkIn(graphIn,arrLevelSorted[ijl][jil].id)&&(checkIn(graphIn,arrLevelSorted[ijl][jil].MID)||checkIn(graphIn,arrLevelSorted[ijl][jil].FID)||checkIn(graphIn,arrLevelSorted[ijl][jil].HWID))){ //check here again.
				//if their connection 
				
					if(arrLevelSorted[ijl][jil].MID&&!arrLevelSorted[ijl][jil].FID){ // connect with mother only and this is have ISIN = 1 // mean OUT
						g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].MID.toString()));//countEdge++;
					}
					else if(arrLevelSorted[ijl][jil].FID&&!arrLevelSorted[ijl][jil].MID){
						g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].FID.toString()));	
					}
					else if(arrLevelSorted[ijl][jil].FID&&arrLevelSorted[ijl][jil].MID){ 
						if(arrLevelSorted[ijl][jil].isin == 0){
							g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].MID.toString()));
						}
						else g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].FID.toString()));	
					
					}
					//BEGIN ADD RELATIVE
					if(arrLevelSorted[ijl][jil].HWID)
					{
						g.addEdge(String(arrLevelSorted[ijl][jil].id.toString()),String(arrLevelSorted[ijl][jil].HWID.toString()));
					}
				
				}
			}
		}
		
	}
}
var add_rem_Child = function(arr,g,nodeId,numLevel,type){  //1 mean add, 0 mean remove
	var a;
	var b;

	var levelAdded = 0; // count how many levels of that node were added, if it equal numLevel mean break !
	for(var i = 0; i<arr.length;i++){
		for(var j = 0; j<arr[i].length;j++){
			if(arr[i][j].id == nodeId){
				a = i;
				b = j;
				i = arr.length-1;
				j = arr[arr.length-1].length;
			}
		}
	} // end search Node
	
	if(type == 1){ //add
		var added = new Array();
//		var index = 0;
		added[0] = new String(nodeId);
	//	alert(added[0]);
//	alert(arr[2][3].HWID);
		for(var i = a+1; i<arr.length; i++){
			for(var j = 0; j<arr[i].length; j++){	
				if((arr[i][j].FID && checkIn(added,arr[i][j].FID)) || (arr[i][j].MID && checkIn(added,arr[i][j].MID)) || checkIn(added,arr[i][j].HWID)){
				//if((arr[i][j].FID && checkIn(added,arr[i][j].FID)) || (arr[i][j].MID && checkIn(added,arr[i][j].MID)) || (arr[i][j].HWID && checkIn(added,arr[i][j].HWID))){
					addArray(added,arr[i][j].id);
		//		alert(added[added.length-1]);
				//	if(checkIn(added,arr[i][j].FID)){alert("booooooo,");}
					//--------------------------------------------------------------- ADD
										g.addNode(String(arrLevelSorted[i][j].id),
											{name:arrLevelSorted[i][j].name,
											x:arrLevelSorted[i][j].x, 
											y:arrLevelSorted[i][j].y, 
											level:arrLevelSorted[i][j].level, 
											sex:arrLevelSorted[i][j].sex, 
											FID:arrLevelSorted[i][j].FID,
											MID:arrLevelSorted[i][j].MID,
											HWID:arrLevelSorted[i][j].HWID, 
											color:arrLevelSorted[i][j].color,
											group:arrLevelSorted[i][j].group,
											numInGroup:arrLevelSorted[i][j].numInGroup,
											isEnd:arrLevelSorted[i][j].isEnd,
											isin:arrLevelSorted[i][j].isin,
											isExpand:arrLevelSorted[i][j].isExpand,
											text:arrLevelSorted[i][j].text,
											marked:arrLevelSorted[i][j].marked
											}
										); 
										arrLevelSorted[i][j].isAdded = true;
										addArray(graphIn,arrLevelSorted[i][j].id);
										
											if(arrLevelSorted[i][j].MID&&!arrLevelSorted[i][j].FID){ // connect with mother only and this is have ISIN = 1 // mean OUT
												g.addEdge(String(arrLevelSorted[i][j].id.toString()),String(arrLevelSorted[i][j].MID.toString()));//countEdge++;
											}
											else if(arrLevelSorted[i][j].FID&&!arrLevelSorted[i][j].MID){
												g.addEdge(String(arrLevelSorted[i][j].id.toString()),String(arrLevelSorted[i][j].FID.toString()));	
											}
											else if(arrLevelSorted[i][j].FID&&arrLevelSorted[i][j].MID){ 
												if(arrLevelSorted[i][j].isin == 0){
													g.addEdge(String(arrLevelSorted[i][j].id.toString()),String(arrLevelSorted[i][j].MID.toString()));
												}
												else g.addEdge(String(arrLevelSorted[i][j].id.toString()),String(arrLevelSorted[i][j].FID.toString()));	
											
											}
											//BEGIN ADD RELATIVE
											if(arrLevelSorted[i][j].HWID)
											{
												g.addEdge(String(arrLevelSorted[i][j].id.toString()),String(arrLevelSorted[i][j].HWID.toString()));
											}
					//--------------------------------- END ADD						
				//	alert(added[added.length-1]);
				}
			}
		}
	}
	else{//type = 0; sub
		var removeArr = new Array(); // what will be removeS
		addArray(removeArr,nodeId);
		for(var i = a+1; i<arr.length; i++){
			for(var j = 0; j<arr[i].length; j++){	
			//checkIn(added,arr[i][j].FID)|| checkIn(added,arr[i][j].MID) || checkIn(added,arr[i][j].HWID)
				if(checkIn(removeArr,arr[i][j].FID)|| checkIn(removeArr,arr[i][j].MID) || checkIn(removeArr,arr[i][j].HWID)){
					addArray(removeArr,arr[i][j].id);
				//	removeArray(added,arr[i][j].id);
					arr[i][j].isAdded = false;
					removeArray(graphIn,arrLevelSorted[i][j].id);
				}	
			}
		}
		for(var i = 0; i< removeArr.length; i++){
			if(removeArr[i]!=nodeId){
				g.removeNode(removeArr[i]);
			}
		}
	//	removeArray(removeArr,nodeId);
	
	
	}
}
var checkIn = function(arr,str){
	for(var i = 0; i< arr.length;  i++){
		if(arr[i] == str){
			return 1;
		}
	}
	return 0;
}
function addArray(arr,ele)
{
	arr[arr.length] = new String(ele);
}
function removeArray(arr,ele)
{
	for(var i = 0; i<arr.length; i++){
		 if(arr[i] == ele) {
              arr.splice(i, 1);
          }
	}
}
function setExpand(g,nodeID){ //nodeID is ID of children, then use it and set for their parent
	if(g.nodes[nodeID].FID){
		g.nodes[g.nodes[nodeID].FID].isExpand = true;

	}
	if(g.nodes[nodeID].MID){
		g.nodes[g.nodes[nodeID].MID].isExpand = true;
		
	}
}









