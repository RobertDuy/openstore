function setXY(arr,width,height)
{
	//devide , equal to others
	for(var i = 0; i<arr.length; i++){
		for(var j = 0; j<arr[i].length; j++){
			arr[i][j].y = 20+i/(height-40); // up down 20px
			arr[i][j].x = (j+1)*((width-40)/(arr[i].length+1));//2 virtual node at left and right
			//alert(arr[i][j].group);
		}
	}
}

function setXY1(arr,width,height)
{// alert(width); alert(height);
//group all relative node
	for(var i = 0; i<arr.length; i++){
		for(var j = 0; j<arr[i].length; j++){ 
			arr[i][j].y = 30+i/(height-40)*33000; // up down 20px //30 is 20 of big node and ~ some pixel of a half mini ellipse
			//arr[i][j].x = (j+1)*((width-40)/(arr[i].length+1));//2 virtual node at left and right
		//	arr[i][j].x = (arr[i][j].group)*(width-40)/(arr[i][arr[i].length-1]/*the end element*/.group+1)+(arr[i][j].numInGroup-1)*9.8;
			if(arr[i][arr[i].length-1]/*the end element*/.group>1){
			
				arr[i][j].x = 40/*for 10 + 30 is a half of box*/ +(arr[i][j].group-1)*(width-40-arr[i].length*60)/(arr[i][arr[i].length-1]/*the end element*/.group-1)+(j)*64/*60 + 2*2 is stroke ==2*/ -5;//(arr[i][j].numInGroup-1)*75;
			//if(i==2){alert((width-40)+" "+(arr[i][arr[i].length-1]/*the end element*/.group));}
			}
			else{
				arr[i][j].x = width/2+(j-arr[i][arr[i].length-1].numInGroup/2)*64;
			}
			if(i==1)
			{//alert(j*60);
			}
		}
	}
}
function setXY2(arr,width,height) // this will content virtual node 
{
	//depth first search from leaf to root, add virtual node
	for(var i = 0; i<arr.length; i++){
		for(var j = 0; j<arr[i].length; j++){
			arr[i][j].y = 20+i/(height-40); // up down 20px
			//arr[i][j].x = (j+1)*((width-40)/(arr[i].length+1));//2 virtual node at left and right
			arr[i][j].x = (arr[i][j].group)*(width-40)/(arr[i][arr[i].length-1]/*the end element*/.group+1)+(arr[i][j].numInGroup-1)*10;
		}
	}
}
function countEnd(arr){
	var x = 0;
	for (var i = 0; i<arr.length; i++){
		if(arr[i].isEnd){
			x++;
		}
	}
	return x;
}