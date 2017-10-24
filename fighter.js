class Fighter {
	constructor(fighter) {
		if (fighter != undefined) {
			this.animations = fighter.animations;
		} else {
			this.animations = {
				stand: [],
				getHurt: [],
				hurt: [],
				die: [],
				finish: [],
			};
		}
		this.curAnimation = [];
		this.curFrame = [
			[]
		];
		this.isPlayingAnimation = false;
		this.frame = 0;
	}

	playAnimation(animation, fighter) {
		// if(fighter == undefined)
		// 	fighter = this;
		//this.curAnimation = animation;
		if (this.frame < this.curAnimation.length - 1) {
			this.frame++;
			// setTimeout(function() {
			// 	fighter.playAnimation(animation);
			// }.bind(null, fighter), 500);
		} else {
			this.isPlayingAnimation = false;
			this.frame = 0;
		}
		if (this.curAnimation[this.frame] != undefined)
			this.curFrame = this.curAnimation[this.frame];
	}

	startAnimation(animation) {
		this.isPlayingAnimation = true;
		this.frame = -1;
		this.curAnimation = animation;
		this.playAnimation();
	}

	stand() {
		this.startAnimation(this.animations.stand);
	}

	getHurt() {
		this.startAnimation(this.animations.getHurt);
	}

	hurt() {
		this.startAnimation(this.animations.hurt);
	}

	die() {
		this.startAnimation(this.animations.die);
	}

	finish() {
		this.startAnimation(this.animations.finish);
	}

}