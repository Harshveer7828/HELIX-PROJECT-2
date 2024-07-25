    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector("#main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".smooth-scroll" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    locoScroll.stop();



const loader = ()=>{
    const loader = document.querySelector(".loader")

    setTimeout(()=>{
        loader.style.top = "-100vh"
        locoScroll.start();
    },2000)
}

loader()

const heroSection = ()=>{
    // d('prev');
let next = document.getElementById('next');
let image = document.querySelector('.images');
let items = document.querySelectorAll('.images .item');
let contents = document.querySelectorAll('.content .item');

let rotate = 0;
let active = 0;
let countItem = items.length;
let rotateAdd = 360 / countItem;

function nextSlider(){
    active = active + 1 > countItem - 1 ? 0 : active + 1;
    rotate = rotate + rotateAdd; 
    show();
}
function prevSlider(){
    active = active - 1 < 0 ? countItem - 1 : active - 1;
    rotate = rotate - rotateAdd; 
    show();     
     
}
function show(){
    image.style.setProperty("--rotate", rotate + 'deg');
    image.style.setProperty("--rotate", rotate + 'deg');
    contents.forEach((content, key) => {
        if(key == active){
            content.classList.add('active');
        }else{
            content.classList.remove('active');
        }
    })
}
next.onclick = nextSlider;
prev.onclick = prevSlider;
// const autoNext = setInterval(nextSlider, 3000);
}

heroSection();

const mouseMove = () => {
    const coords = { x: 0, y: 0 };
    const circles = document.querySelectorAll(".circle");

    const colors = [
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "#0F1115",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "white",
        "black"
    ];

    circles.forEach(function (circle, index) {
        circle.x = 0;
        circle.y = 0;
        circle.style.backgroundColor = colors[index % colors.length];
    });

    window.addEventListener("mousemove", function (e) {
        coords.x = e.clientX;
        coords.y = e.clientY;

    });

    function animateCircles() {

        let x = coords.x;
        let y = coords.y;

        circles.forEach(function (circle, index) {
            circle.style.left = x - 12 + "px";
            circle.style.top = y - 12 + "px";

            circle.style.scale = (circles.length - index) / circles.length;

            circle.x = x;
            circle.y = y;

            const nextCircle = circles[index + 1] || circles[0];
            x += (nextCircle.x - x) * 0.3;
            y += (nextCircle.y - y) * 0.3;
        });

        requestAnimationFrame(animateCircles);
    }

    animateCircles();

}

mouseMove();


const SliderFunction = ()=>{
    // gsap.registerPlugin(CustomEase);
    // CustomEase.create(
    //     "easeOut",
    //     "M0, 0 C0.083,0.294 0.117, 0.767 0.413, 0908 0.606, 1 0.752,1 1, 1"
    // )
    window.addEventListener("load",()=>{

        const slider = document.querySelector("#slider");
        let slides = document.querySelectorAll(".slide");
        let animating = false;

        let duration = 1.5;
        slides.forEach((slide,index)=>{
            if(index > 0){
                gsap.set(slide,{
                    clipPath:"polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                })
            }
        });

        function initializeFlexvalue(){
            const timeline = document.querySelector(".timeline");
            const counters = timeline.querySelectorAll("p");

            counters[0].style.flexGrow = 5;
            counters[0].style.width = "max-content";
            counters[1].style.flexGrow = 5;
            counters[1].style.width = "max-content";
            counters[2].style.flexGrow = 5;
            counters[2].style.width = "max-content";
            counters[3].style.flexGrow = 5;
            counters[3].style.width = "max-content";
            counters[4].style.flexGrow = 5;
            counters[4].style.width = "max-content";

            for(let i = 5; i < counters.length; i++){
                counters[i].style.flexGrow = 0;
                counters[i].style.width = "0px"
            }
            

        }
        initializeFlexvalue();

        // append new counter

        function AppendNewCounter(){
            const timeline = document.querySelector(".timeline");
            const counters = Array.from(timeline.querySelectorAll("p"));
            
            const firstIndex = counters.findIndex((p)=>p.classList.contains("first"));
            for (let i = 0; i < firstIndex; i++) {
                counters[i].remove();                
            }

            for (let i = 1; i <= 8; i++) {
                const newSup = document.createElement("sup");
                newSup.textContent = "pm";

                const newP = document.createElement("p");
                newP.textContent = i;
                newP.style.flexGrow = 0;
                newP.style.width = "0px";
                newP.appendChild(newSup);
                timeline.appendChild(newP); 
                
            }

        }

        AppendNewCounter()

        const HandlerSlide = ()=>{
            if(animating) return;
            animating = true;
            slides = slider.querySelectorAll(".slide");
            console.log(slides);
            const firstSlide = slides[0];
            const firstSlideImg = firstSlide.querySelector("img");

            if(slides.length > 1){
                const secondSlide = slides[1];
                const secondSlideImg = secondSlide.querySelector("img");
                gsap.set(secondSlideImg,{x: 250});

                gsap.to(secondSlideImg,{
                    x: 0,
                    duration : duration,
                    ease: "easeOut"
                });

                gsap.to(firstSlideImg,{
                    x: -500,
                    duration : duration,
                    ease: "easeOut"
                })

                gsap.to(secondSlide,{
                    clipPath:"polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: duration,
                    ease: "easeOut",
                    onComplete: ()=>{
                        firstSlide.remove();
                        slider.appendChild(firstSlide);


                        gsap.set(firstSlide,{
                            clipPath:"polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",

                        })
                        animating = false
                    },
                });
            }else{
                animating =false
            }

            const timeline = document.querySelector(".timeline");
            const counters = timeline.querySelectorAll("p");

            let lastFlexGrow = counters[counters.length - 1].style.flexGrow;

            const lastCounter = document.querySelector(".timeline .last");
            if(lastCounter && lastCounter.textContent === "7pm"){
                AppendNewCounter()
            }

            counters.forEach((p)=>{
                p.classList.remove("last");
                p.classList.remove("first");
            });

            let firstAssigned = false;

            for (let i = counters.length; i > 0 ; i--) {
                gsap.to(counters[i],{
                    flexGrow: counters[i-1].style.flexGrow,
                    duration: duration,
                    ease:  2, //hop,
                    onStart: ()=>{
                        let newWidth = counters[i-1].style.flexGrow > 0 ? "max-content":"0px";
                        gsap.set(counters[i],{width : newWidth});

                        if(counters[i-1].style.flexGrow === "5"){
                            counters[i].classList.add("first");
                            firstAssigned = true;
                        } else if(counters[i-1].style.flexGrow === "1" && !firstAssigned){
                            counters[i].classList.add("last");
                        }
                    }
                })
                
            }

            gsap.to(counters[0],{
                flexGrow: lastFlexGrow,
                duration:duration,
                ease : 2, //hop
                onStart: ()=>{
                    let newWidth = lastFlexGrow > 0 ? "max-content" : "0px";
                    gsap.set(counters[0],{width : newWidth});

                    if(lastFlexGrow === "5"){
                        counters[0].classList.add("first");
                    }else if(lastFlexGrow === "1" && !firstAssigned){

                        counters[0].classList.add("last");
                    }
                }
            })
        }
        this.document.addEventListener("click",HandlerSlide);
    })
}

SliderFunction();


const HorizontalScroll = ()=>{
    let horizontalPage = document.querySelector("#horizontalSlider");

    gsap.to(horizontalPage,{
        x:'-280vw',
        ease:"slow",
        scrollTrigger:{
            trigger:"#horizontalSlider",
            scroller:"#main",
            pin:true,
            scrub:2
        }
    })

}

HorizontalScroll()



const page5Slider = ()=>{
    let CurrentIndex = 1;
    let totalSlides = 7;

    const updateSlides = ()=>{
        document.querySelectorAll(".titles5").forEach((el,index)=>{
            if(index === CurrentIndex){
                el.classList.add("active");
            } else{
                el.classList.remove("active");
            }
        });

    };

    const HandlerSlider = ()=>{
        if(CurrentIndex < totalSlides) CurrentIndex++;
        else CurrentIndex = 1;

        gsap.to(".slider-titles",{
            onStart: ()=>{
                setTimeout(()=>{
                    updateSlides()
                },100);

                updateImage(CurrentIndex + 1);
            },
            x:`-${(CurrentIndex - 1) * 11.1111}%`,
            duration:2,
            ease:"power4.out"
        });

    }

    const trimExcessImages = ()=>{
        const selectors = [".img-top",".img-bottom"]; 

        selectors.forEach((selector)=>{
            const container = document.querySelector(selector);
            const images = Array.from(container.querySelectorAll("img"));
            const excessCount = images.length - 5;

            if(excessCount > 0){
                images.slice(0, excessCount).forEach((image)=>{
                    container.removeChild(image);
                })
            }
        })
    }

    const updateImage = ()=>{
        const imgSrc = `./src/page5/${CurrentIndex}.jpg`;
        const imgTop = document.createElement("img");
        const imgBottom = document.createElement("img");

        imgTop.src = imgSrc;
        imgBottom.src = imgSrc;

    

        imgTop.style.transform = "scale(2)";
        imgBottom.style.transform = "scale(2)";

        document.querySelector(".img-top").appendChild(imgTop);
        document.querySelector(".img-top").appendChild(imgBottom);

        gsap.to([imgTop, imgBottom],{
            transform: "scale(1)",
            duration:2,
            ease:"power4.out",
            stagger:0.15,
            onComplete : trimExcessImages,

        });


       

    }


    document.addEventListener("DOMContentLoaded",()=>{
        document.addEventListener("click",HandlerSlider);
         updateImage(2);

         updateSlides();
    })

}

page5Slider();