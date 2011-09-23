(function(l){
	var color = new Color(0.5, 0.5, 1, 1);
	
	for(var i = 0; i < 20; ++i) {
		var y = i * -50;
		
		if(i % 3 == 0) {
			l.planets.push( new Planet(v2(-100, y), 40, color) );
			l.planets.push( new Planet(v2( 100, y), 40, color) );
		}
		l.dots.push( new Dot(v2(0, y)) );
		
		l.ship.pos.set(0, 300)
		l.ship.speed.set(0, -150)
	}
})(Level.current);
