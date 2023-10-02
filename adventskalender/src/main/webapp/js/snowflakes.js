const NUM_OF_FLAKES = 15;

class Snowflakes extends HTMLElement {
	constructor() {
		super();
		this._root = this.attachShadow({ mode: 'closed' });
	}


	connectedCallback() {
		this.render();
	}

	render() {
		this._root.innerHTML = `
			<style>
				@keyframes snowflakes--fall {
					0% { top: -2em; }
					100% { top: 100%; }
				}
				@keyframes snowflakes--glide {
					0%, 100% { transform: translateX(0); }
					50% { transform: translateX(5em); }
				}
				.snowflake {
					color: white;
					font-family: Arial, sans-serif;
					text-shadow: 0 0 0.2em black;
					position: fixed;
					top: -2em;
					z-index: 9999;
					user-select: none;
					animation-name: snowflakes--fall, snowflakes--glide;
					animation-duration: 10s, 5s;
					animation-timing-function: linear, ease-in-out;
					animation-iteration-count: infinite;
				}
			</style>
			${ [ ...Array(NUM_OF_FLAKES).keys() ]
				.map( ( n ) => `
					<div class="snowflake" style="left:${n*100/NUM_OF_FLAKES}%;animation-delay:${Math.random()*10.0}s,${-Math.random()*10.0}s">${ n%2==0 ? '❅' : '❆' }</div>
				`).join('')
			}
		`
	}
}

customElements.define("my-snowflakes", Snowflakes);
