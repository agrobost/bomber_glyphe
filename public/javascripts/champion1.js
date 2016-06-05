var Champion1 = function(speeed, posiition){
	var positionReceived = posiition;
	var nextDirectionReceived = -1;

	var sprite = new Image();
	sprite.src = '../images/sprite1.png';
	var xSprite, ySprite, widthSprite, heightSprite;
	var columnSprite = 1;
	var lineSprite = 0;
	
	
	var time = 0, lastTimestamp = 0;
	var speed = speeed;
	var d1 = 0, d2 = 0, d3 = 0, d4 = 0;



	this.draw = function(ctx, canvas){		
		if(lastTimestamp == 0)
			lastTimestamp = Date.now();
		time = Date.now()-lastTimestamp;
		lastTimestamp = Date.now();	
		updatePosition(positionReceived, nextDirectionReceived, time);
		switch(nextDirectionReceived){
			case 37:
			d2 = d3 = d4 = 0;
			d1 += speed*time;
			
			lineSprite = 1;
			if(d1>10){
				columnSprite++;
				d1 = 0;
			}
			if(columnSprite==3){
				columnSprite = 0;
			}			
			break;

			case 38:
			d1 = d3 = d4 = 0;	
			d2 += speed*time;
			
			lineSprite = 3;
			if(d2>10){
				columnSprite++;
				d2 = 0;
			}
			if(columnSprite==3){
				columnSprite = 0;
			}				
			break;

			case 39:
			d1 = d2 = d4 = 0;
			d3 += speed*time;
			
			lineSprite = 2;
			if(d3>10){
				columnSprite++;
				d3 = 0;
			}
			if(columnSprite==3){
				columnSprite = 0;
			}			
			break;

			case 40:
			d1 = d2 = d3 = 0;
			d4 += speed*time;
			
			lineSprite = 0;
			if(d4>10){
				columnSprite++;
				d4 = 0;
			}
			if(columnSprite==3){
				columnSprite = 0;
			}
			break;

			default:
			time = 0;
			lastTimestamp = 0;
			columnSprite = 1;
			if(lineSprite == 1 || lineSprite == 2)
				columnSprite = 2;
			d1 = d2 = d3 = d4 = 0;
			break;
		}
		ctx.drawImage(sprite,(192/3)*columnSprite,(256/4)*lineSprite,(192/3),(256/4),positionReceived.x-env.sizeCell/2,positionReceived.y-env.sizeCell/2,env.sizeCell,env.sizeCell);
		ctx.fillStyle="#FF0000";
		ctx.fillText(positionReceived.x+"/"+positionReceived.y,10,10);		
	}

	this.setPosition = function(p,nd){
		positionReceived = p;
		nextDirectionReceived = nd;
	}

	this.showCurrentCell = function(ctx, canvas){
		var coord = {x:Math.round((positionReceived.x-env.sizeCell/2)/env.sizeCell),y:Math.round((positionReceived.y-env.sizeCell/2)/env.sizeCell)};
		
		
		ctx.beginPath();
		ctx.lineWidth="1.5";
		ctx.strokeStyle ="#cccccc";
		ctx.rect(coord.x*env.sizeCell,coord.y*env.sizeCell,env.sizeCell,env.sizeCell);
		ctx.stroke();
	}

	var updatePosition = function(position, direction, time){
		var futurPosition = Object.assign({},position);
		switch(direction){
			case 37:
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x -= speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.y += realDistance;			
			break;

			case 38:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y -= speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.x += realDistance;
			break;

			case 39:			
			x = (position.y-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.x += speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.y+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.y += realDistance;
			break;

			case 40:
			x = (position.x-env.sizeCell/2)/env.sizeCell;
			roundX = Math.round(x);
			if(x == roundX){
				futurPosition.y += speed*time
				break;
			}
			signe = (roundX-x)/Math.abs(roundX-x);			
			max = (roundX*env.sizeCell)-position.x+env.sizeCell/2;
			realDistance = Math.abs(signe*speed*time) < Math.abs(max) ? signe*speed*time : max;
			futurPosition.x += realDistance;
			break;


			default:
			break;
		}

		var left = {x:Math.round((futurPosition.x-env.sizeCell)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var top = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell)/env.sizeCell)};
		var right = {x:Math.round((futurPosition.x)/env.sizeCell),y:Math.round((futurPosition.y-env.sizeCell/2)/env.sizeCell)};
		var bot = {x:Math.round((futurPosition.x-env.sizeCell/2)/env.sizeCell),y:Math.round((futurPosition.y)/env.sizeCell)};
		var leftCell = env.map[left.x][left.y];
		var topCell = env.map[top.x][top.y];
		var rightCell = env.map[right.x][right.y];
		var botCell = env.map[bot.x][bot.y];
		var currentCell = env.map[Math.round((position.x-env.sizeCell/2)/env.sizeCell)][Math.round((position.y-env.sizeCell/2)/env.sizeCell)];

		if(direction == 37 && (leftCell === 0 || leftCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}else if(direction == 38 && (topCell === 0 || topCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;

		}else if(direction == 39 && (rightCell === 0 || rightCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}else if(direction == 40 && (botCell === 0 || botCell === currentCell)){
			position.x = futurPosition.x;
			position.y = futurPosition.y;
		}
	}


}
