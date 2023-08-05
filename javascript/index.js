function animateCounter(element, targetValue, duration) {
    let currentValue = parseInt(element.textContent);
    let increment = Math.ceil(targetValue / (duration / 10));

    let interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= targetValue) {
            currentValue = targetValue;
            clearInterval(interval);
        }
        element.textContent = currentValue;
    }, 10);
}

function handleIntersection(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const targetElement = entry.target;
            const targetValue = parseInt(targetElement.getAttribute("data-target-value"));
            const duration = 3000;

            animateCounter(targetElement, targetValue, duration);

            observer.unobserve(targetElement);
        }
    });
}

const observer = new IntersectionObserver(handleIntersection, {
    threshold: 0.1
});

const counterItems = document.querySelectorAll(".counter-item");
counterItems.forEach(item => {
    observer.observe(item);
});
