// loader.js
export function initLoader(customTitle = "Loading...") {
    // Inject the HTML with the custom title using a template literal
    const loaderHTML = `
        <div id="preloader">
            <div class="loader-content">
                <h2 id="loader-title">${customTitle}</h2>
                <div id="loader-percentage">0%</div>
                <div class="loader-track"><div id="loader-bar"></div></div>
            </div>
        </div>`;
    document.body.insertAdjacentHTML('afterbegin', loaderHTML);

    const bar = document.getElementById('loader-bar');
    const percentText = document.getElementById('loader-percentage');
    let progress = 0;

    const interval = setInterval(() => {
        if (progress < 90) {
            progress += Math.random() * 3;
            updateLoader(Math.min(progress, 90));
        }
    }, 100);

    function updateLoader(val) {
        const rounded = Math.floor(val);
        bar.style.width = rounded + "%";
        percentText.innerText = rounded + "%";
    }

    window.addEventListener("load", () => {
        clearInterval(interval);
        updateLoader(100);
        setTimeout(() => {
            document.getElementById('preloader').classList.add('fade-out');
        }, 500);
    });
}



// // loader.js
// export function initLoader() {
//     // 1. Create and Inject HTML
//     const loaderHTML = `
//         <div id="preloader">
//             <div class="loader-content">
//                 <h2 id="loader-title">Loading...</h2>
//                 <div id="loader-percentage">0%</div>
//                 <div class="loader-track"><div id="loader-bar"></div></div>
//             </div>
//         </div>`;
//     document.body.insertAdjacentHTML('afterbegin', loaderHTML);

//     const bar = document.getElementById('loader-bar');
//     const percentText = document.getElementById('loader-percentage');
//     let progress = 0;

//     // 2. Start Simulation
//     const interval = setInterval(() => {
//         if (progress < 90) {
//             progress += Math.random() * 3;
//             updateLoader(Math.min(progress, 90));
//         }
//     }, 100);

//     function updateLoader(val) {
//         const rounded = Math.floor(val);
//         bar.style.width = rounded + "%";
//         percentText.innerText = rounded + "%";
//     }

//     // 3. Listen for Page Load
//     window.addEventListener("load", () => {
//         clearInterval(interval);
//         updateLoader(100);
//         setTimeout(() => {
//             document.getElementById('preloader').classList.add('fade-out');
//         }, 500);
//     });
// }
