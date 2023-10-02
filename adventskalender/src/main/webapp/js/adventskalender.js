
class Adventskalender {

	init() {
		this.enableStarButtons();
		this.addClickActionsToButtons(document);
		this.fitWindow();
		document.querySelector("#intro_button").focus();
		window.addEventListener("resize", this.fitWindow);
	}

	enableStarButtons() {
		document.querySelectorAll(".btn-star").forEach(el => this.disableClosedStarButton(el));
	}

	addClickActionsToButtons(parentElement) {
		parentElement.querySelectorAll("[data-content]")
			.forEach( el => {
				el.addEventListener('click', evnt => this.showContent(evnt));
			});
		parentElement.querySelectorAll("#close_button").forEach(el => el.addEventListener("click", evnt => this.hideContent(evnt)));
		parentElement.querySelectorAll("#spoiler_button").forEach(el => el.addEventListener("click", evnt => this.spoiler(evnt)));
		if ( navigator.share ) {
			const shareEl = parentElement.querySelector("#teilen-link");
			if ( shareEl ) {
				shareEl.addEventListener("click", evnt => this.share(evnt));
				shareEl.classList.add("btn");
				shareEl.classList.add("btn-border");
			}
		}
	}

	disableClosedStarButton(el) {
		if (this.isOpen(el)) {
			el.disabled = false;
		} else {
			el.disabled = true;
		}
	}

	share() {
		const data = {
			title: "Elektronik Adventskalender",
			text: "Ich finde diesen Adventskalender cool: " + window.location,
			url: window.location
		};
		navigator.share( data );
	}

	isOpen(el) {
		const day = el.dataset.day;
		const today = new Date();
		if (today.getFullYear() > 2023) {
			return true;
		}
		if (today.getMonth() == 11) {
			return today.getDate() >= day;
		}
		return false;
	}

	spoiler() {
		document.querySelectorAll(".btn-star[data-content]" ).forEach(el => el.disabled = false);
		this._recent = document.querySelector(".btn-star[data-content]");
		this.hideContent();
	}

	showContent(evnt) {
		this._recent = evnt.target;
		const content = evnt.target.dataset.content;
		const targetSection = document.querySelector(".content-container");
		const target = document.querySelector(".content");
		const url = document.querySelector("#"+content).href;
		fetch(url)
			.then(result => { if (result.ok) return result; else throw new Error("oups"); })
			.then(result => result.text())
			.then(text => {
				const template = document.createElement('template');
				template.innerHTML = text;
				target.innerHTML = template.content.querySelector('.content-container').innerHTML;
			})
			.then(() => this.addClickActionsToButtons(target))
			.catch((e) => {
				console.log(e);
				target.innerHTML = "<h1>Oups</h1><p>Irgendwas ging schief. Bist Du mit dem Internet verbunden?</p>";
			})
			.then(() => target.scrollTo(0, 0));
		targetSection.classList.add("active");
		targetSection.querySelector("#close_button").focus();
	}

	hideContent() {
		document.querySelector(".content-container").classList.remove("active");
		document.querySelector( ".content" ).innerHTML = "";
		if ( this._recent ) {
			this._recent.focus();
		}
	}

	fitWindow() {
		document.querySelector("main").setAttribute("style", "height:" + window.innerHeight + "px");
	}
}

new Adventskalender().init();
