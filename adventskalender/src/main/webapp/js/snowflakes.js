/**      MIT License

    Copyright (c) 2023 Dr Fritjof Flechsig

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.
    */

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
			${[...Array(NUM_OF_FLAKES).keys()]
                .map((n) => `
					<div class="snowflake" style="left:${n * 100 / NUM_OF_FLAKES}%;animation-delay:${Math.random() * 10.0}s,${-Math.random() * 10.0}s">${n % 2 == 0 ? '❅' : '❆'}</div>
				`).join('')
            }
		`
    }
}

customElements.define("my-snowflakes", Snowflakes);
