console.log("Script is working");

const lenis = new Lenis()

lenis.on('scroll', (e) => {
  console.log(e)
})

function raf(time) {
  lenis.raf(time)
  requestAnimationFrame(raf)
}

requestAnimationFrame(raf)

const trails = document.querySelectorAll(".trail");
const smoothPointer = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
};
const totalPointArray = [20, 18, 15, 12, 10, 5]
window.addEventListener("mousemove", (event) => {
    gsap.to(smoothPointer, {
        x: event.clientX,
        y: event.clientY,
        duration: 1,
        ease: "power2.out",
    });
});
function updatePath(){
    trails.forEach((path, index) => {
        let points = path.points || [];
        points.unshift({...smoothPointer});
        while(points.length > totalPointArray[index]){
            points.pop();
        }
        path.points = points;
        if (points.length > 1){
            let d = `M ${points[0].x} ${points[0].y}`;
            for(let i=1; i<points.length; i++){
                d += `L ${points[i].x} ${points[i].y}`;
            }
            path.setAttribute("d", d);
        }
    });
    requestAnimationFrame(updatePath);
}
updatePath();