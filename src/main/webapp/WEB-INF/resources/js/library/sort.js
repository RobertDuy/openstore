/*
*This function is sort array[i] depend on their relative
*If husband/wife is a group
*If brother is near
*Function will auto set attribute "this.group", begin with zero
*This attribute will used for calculate their parents' location
*/
var group = 1; //default, the first group in this level is 1, increase by 1.
var x = function(array2dimension,z) // z is sorted
{
//set exactly of root first
//alert(array2dimension[0].length);

	for(var r = 0; r<array2dimension[0].length; r++)
	{	
		if(array2dimension[0][r].sex == 1){
			array2dimension[0][r].group = 1;
			setset(array2dimension[0][r],z[0][0]);
			setset(array2dimension[0][0],z[0][r]);
		}
	}
	for(var set = 0; set < array2dimension[0].length; set++)
	{
		array2dimension[0][set].group = 1;
		z[0][set].group = 1;
		z[0][set].numInGroup = set+1;
	}
	var z_index = 0; // this wiil keep index of node will be insert on z[i]

	// push all root to arr[0]
	var numbersOfThis = 1;// numbers of this in all brothers, default is 1, 
	
	for(var i = 0; i< array2dimension.length-1; i++){ // we concentrates to this man/woman, then arrange his/her child OK ??
		for(var j = 0; j<array2dimension[i].length; j++){ //for each
			if(z[i][j].isin == 0 ){ // this if condition for dissmiss their relative nodes //  || (z[i][j].isin == 1 && z[i][j].HWID == null)				
				if(z[i][j].sex == 1) {// mean this is a man
					/*
					*arrange his child
					*for each child inserted, insert their relatives before next child.
					*we not sure about numbers of relatives, yes, not mean at left is before and right is after, it depend on... Random ^^
					*oh men, take a loop again !!
					*/
					for(var k1 = 0; k1<array2dimension[i+1].length; k1++){
						for(var k = 0; k<array2dimension[i+1].length; k++){ //alert("ccc"); // thieu 1 vong lap  ....AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA						
							if(array2dimension[i+1][k].FID == z[i][j].id && array2dimension[i+1][k].numbers == numbersOfThis){	//alert(array2dimension[i][j].id);
								setset(array2dimension[i+1][k],z[i+1][z_index]);
								z_index++; //alert(z[i][j].id+"   _  "+z[i+1][z_index-1].id +" number " + numbersOfThis);
																
								for(var m = 0; m<array2dimension[i+1].length; m++){//their relative process in this loop
									if(array2dimension[i+1][m].HWID == array2dimension[i+1][k].id){
										setset(array2dimension[i+1][m],z[i+1][z_index]);// if need a numbers of relative, take an if() here
										z_index++;//alert(z[i][j].id+"   _  "+z[i+1][z_index-1].id +"aaaaa" + numbersOfThis);										
									}
								}
								numbersOfThis++;	
							}
						}						
					}				
				}
				else{ // process her child
					for(var k11 = 0; k11<array2dimension[i+1].length; k11++){
						for(var kk = 0; kk<array2dimension[i+1].length; kk++){
							if(array2dimension[i+1][kk].MID == z[i][j].id && array2dimension[i+1][kk].numbers == numbersOfThis){
								setset( array2dimension[i+1][kk],z[i+1][z_index]); 
								z_index++;// alert(z[i][j].id+"   _  "+z[i+1][z_index-1].id);
														
								for(var mm = 0; mm<array2dimension[i+1].length; mm++){//their relative process in this loop
									if(array2dimension[i+1][mm].HWID == array2dimension[i+1][kk].id){
										setset(array2dimension[i+1][mm],z[i+1][z_index]); // if need a numbers of relative, take an if() here
										z_index++;
									}
								}numbersOfThis++;
							}
						}
					
					}
				//	alert(i+"  _  "+z_index);
				}
			}
			numbersOfThis = 1;
			
		}
		z_index = 0;
	}
	//assign group for z array
	/*
	*if  HWID == null-> set group
	*else -> set depend on thier relative
	*/
	group = 1;
	var numInGroup = 1;
	for(var g = 1; g<z.length;g++){
		for(var g1 = 0; g1<z[g].length; g1++){
			if(!z[g][g1].HWID)
			{
				numInGroup = 1;
				z[g][g1].group = group;
				z[g][g1].numInGroup = numInGroup;
				group++;
				numInGroup++;
				
			}
			else{ 
				for(var c = 0; c<z[g].length; c++){ //can be c from 1 to g1-1, SURE
					if(z[g][g1].HWID==z[g][c].id){
						z[g][g1].group = z[g][c].group;
						z[g][g1].numInGroup = numInGroup;
						numInGroup++;
					//	alert(numInGroup);
					}
				}
			}
		}
		group = 1;
	}
	
/*	for(var i = 1; i< array2dimension.length-1; i++){ // we concentrates to this man/woman, then arrange his/her child OK ??
		for(var j = 0; j<=array2dimension[i].length-1; j++){ //for each
			
			if(array2dimension[i][j].isin == 0){ // this if condition for dissmiss their relative nodes
				
				if(array2dimension[i][j].sex == 1) {// mean this is a man
					/*
					*arrange his child
					*for each child inserted, insert their relatives before next child.
					*we not sure about numbers of relatives, yes, not mean at left is before and right is after, it depend on... Random ^^
					*oh men, take a loop again !!
					* /
					//alert(array2dimension[i][j].id);
					for(var k = 0; k<array2dimension[i+1].length; k++){
						if(array2dimension[i+1][k].FID == array2dimension[i][j].id && array2dimension[i+1][k].numbers == numbersOfThis){
							z[i+1][z_index] = array2dimension[i+1][k];
							z_index++;
							numbersOfThis++;
							
							
							for(var m = 0; m<array2dimension[i+1].length; m++){//their relative process in this loop
								if(array2dimension[i+1][m].HWID == array2dimension[i+1][k].id){
									z[i+1][z_index] = array2dimension[i+1][m]; // if need a numbers of relative, take an if() here
									z_index++;
									
								}
							}
						}
					}
				}
				else{ // process her child
					
				}
			}else{	
			}
			//alert(array2dimension[i][j].FID);
		//	alert(i);
		}
	}*/

	return z;
}
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

function setset(a,b) //source , target
{
		b.id = a.id;
		b.name = a.name;
		b.isin = a.isin;
		b.sex = a.sex;
		b.relative = a.relative;
		b.level = a.level;
		b.numbers = a.numbers;
		b.FID = a.FID;
		b.MID = a.MID;
		b.HWID = a.HWID;
		b.tooltip = a.tooltip;
		b.information = a.information;
		b.group = a.group;
		b.numOfGroup = a.numOfGroup;
		b.numInGroup = a.numInGroup;
		b.x = a.x;
		b.y = a.y;
		b.isAdded = a.isAdded;
		b.isExpand = a.isExpand;
		b.text = a.text;
		b.marked = a.marked;
}
//id, name, isin, sex, relative, level, numbers, FID, MID, HWID, tooltip, information
function setToInput(t,s) //t ---> s
{
	s.id = t.id;
	s.name = t.lastname;
	s.isin = t.isin;
	s.sex = t.sex;
	s.relative = t.relative;
	s.level = t.level;
	s.numbers = t.numbers;
	s.FID = t.FID;
	s.MID = t.MID;
	//s.HWID = t.HWID;
	s.tooltip = t.tooltip;
	s.information = t.information;
	s.birthdate = t.birthDate;
	s.avatar = t.avatar;
	
}
function scaleX(arr){ 
/*
*This function will auto set WIDTH of canvas depend on number node
*numX is max-number of level have max-number node
*/
	
	var width = arr[0][arr[0].length-1].numInGroup*60+40;
	for(var i = 0; i<arr.length;i++)
	{
		if(width < 40*arr[i].length+arr[i][arr[i].length-1].group*100)
		{
			width = 40*arr[i].length+arr[i][arr[i].length-1].group*100;
		}
	}
//	alert(width);
	return width;
}
function scaleY(numY){ 
/*
*This function will auto set HEIGHT of canvas depend on Graph.Level+1
*numX is level of graph
*/
	switch(numY)
	{
		case 1 : return 100; break;
		case 2 :
		case 3 :
		case 4 :
		case 5 : return (numY-1)*150+100; break;
		case 6 :
		case 7 :
		case 8 :
		case 9 :
		case 10 : return (numY-1)*120+100; break;
		default : return (numY-1)*100+100; break;
		
	}
return numY;
}
function expand(x)
{
	alert(x);
}
function splitName(x)
{
/*
*This Function input a String, contain 0 - N SPACE. Depend on length, make it to 1-2-3 line 
*If too long, (cut - or) SHORTHAND it!
*/
	var z = x;
	var n = 0; // number of space
	if(x.length>10){
	//	z = x.split(' ').join('\n');
		n = x.split(' ').length-1;

		if(n>2){ // more 4 words
			var index1 = 0;
			var index2 = 0;
			for(var i = 0; i<x.length; i++)
			{
				if(x.charAt(i)==" "){
					if(index1==0){
						index1 = i;
					//	alert("*"+x.charAt(index1)+"*");
					}
				}
				if(x.charAt(x.length-1-i)==" ")
				{
					if(index2 == 0){
						index2 = x.length-i-1;
				//		alert("*"+x.charAt(index2)+"*");
					}
				} 
			}       
			var text = '';
			var text1 = '';
			var arr = x.split(' ');
			for(var i=0;i<arr.length;i++) {
				text += arr[i].substr(0,1);
			}
			for(var i = 1; i<text.length-1; i++)			
			{
				text1+=text.charAt(i); // if too long, KILL it here
			}
		//	alert(index1 + " "+ index2);
			z = "";
			for(var i = 0; i<x.length; i++){
				if(i<=index1 || i>=index2){
					z+=x.charAt(i);
				}
			}
			var z1 = z.replace(" ","\n"+text1+"\n");
			return z1;
		}
		else { // if less than 4 word, new line it only
			z = x.split(' ').join('\n');
			return z ;
		}
		
	}
	
return z; //if normal(too short), just return it
}

