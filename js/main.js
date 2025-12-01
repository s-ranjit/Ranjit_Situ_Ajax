(() => {

  //variables
  const hotspots = document.querySelectorAll(".Hotspot");
  const materialTemplate = document.querySelector("#material-template");
  const materialList = document.querySelector("#material-list");


  //functions
  function loadInfoBoxes() {

    fetch("https://swiftpixel.com/earbud/api/infoboxes")
    .then(response => response.json())
    .then(infoBoxes => {
      console.log(infoBoxes);

      infoBoxes.forEach((infoBox, index) => {
      let selected = document.querySelector(`#hotspot-${index + 1}`);

      const titleElement = document.createElement('h2');
      titleElement.textContent = infoBox.heading;

      const textElement = document.createElement('p');
      textElement.textContent = infoBox.description;

      selected.appendChild(titleElement);
      selected.appendChild(textElement);
    });
    })
    .catch(error => {
      console.log(error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Uh-oh! We ran into a little problem. Check your internet connection or try again soon!";
            document.body.appendChild(errorMessage);
    });
  }
  loadInfoBoxes();

  function loadMaterialInfo() {

     loader.classList.toggle("hidden");

  
    fetch("https://swiftpixel.com/earbud/api/materials")
    .then(response => response.json())
    .then(materialListData=> {
      console.log(materialListData);


    materialListData.forEach(material => {
      // clone the template li with h3 and p inside
      const clone = materialTemplate.content.cloneNode(true);
      // populate the cloned template
      const materialHeading = clone.querySelector(".material-heading");
      materialHeading.textContent = material.heading;

      const materialDescription = clone.querySelector(".material-description");
      materialDescription.textContent = material.description;

     loader.classList.toggle("hidden");

      //Append the populated template to the list
      materialList.appendChild(clone);
    })
      })
     .catch(error => {
      //make a meaningful error message and post to DOM
      console.log(error);
            const errorMessage = document.createElement("p");
            errorMessage.textContent = "Uh-oh! We ran into a little problem. Check your internet connection or try again soon!";
      document.body.appendChild(errorMessage);
    });
  }
  loadMaterialInfo();


  function showInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 1 });
  }

  function hideInfo() {
    let selected = document.querySelector(`#${this.slot}`);
    gsap.to(selected, 1, { autoAlpha: 0 });
  }

  //Event listeners
    hotspots.forEach(function (hotspot) {
    hotspot.addEventListener("mouseenter", showInfo);
    hotspot.addEventListener("mouseleave", hideInfo);
  });

})();

// gsap animate for material description
gsap.registerPlugin(ScrollTrigger); 
gsap.from(".animate", {
    opacity: 0,
    y: 80,
    duration: 1.5,
    ease: "power3.out",
    scrollTrigger: {
      trigger: ".animate",
      scrub: 1,
      toggleActions: "restart pause reverse pause",
      start: "top 95%",
      end: "bottom top"
    }
  });

