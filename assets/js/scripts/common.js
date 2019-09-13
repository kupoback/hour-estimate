import counterUp from "counterup2";

export default {
	init() {
		const button = document.getElementById("get_time");
		let task = document.getElementById("task");
		let taskData = document.querySelector("[data-task]");
		let timeData = document.querySelector("[data-time]");

		let buttonClick = () => {
			taskData.innerText = task.value;
			timeData.innerText = Math.floor(Math.random() * 100) + 1;
			counterUp(timeData, {
				duration: 500,
				delay: 16,
			});
		};

		button.addEventListener("click", buttonClick);
	},
	finalize() {},
};
