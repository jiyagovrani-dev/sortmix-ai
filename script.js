
const itemImage = document.getElementById("itemImage");
const imagePreview = document.getElementById("imagePreview");
const uploadPlaceholder = document.getElementById("uploadPlaceholder");
const photoHelp = document.getElementById("photoHelp");

const itemType = document.getElementById("itemType");
const itemCondition = document.getElementById("condition");
const sortForm = document.getElementById("sortForm");
const resultPanel = document.getElementById("resultPanel");
const analyzeButton = sortForm?.querySelector('button[type="submit"]');

let previewUrl = null;

const guidance = {
    computer: {
        working: ["Reuse, sell, or donate", [
            "Back up your important files.",
            "Erase your personal data securely.",
            "Sell or donate the computer if it still works."
        ]],
        repair: ["Repair before replacing", [
            "Identify the problem.",
            "Get a repair estimate from a trusted technician.",
            "Repair and reuse it if practical."
        ]],
        broken: ["Recycle as electronic waste", [
            "Do not put the computer in regular household waste.",
            "Remove personal storage devices if possible.",
            "Take it to an authorised e-waste collection centre."
        ]],
        unknown: ["Check its condition first", [
            "Check whether the computer switches on.",
            "Consider repair if it does not work properly.",
            "If it cannot be reused, use an authorised e-waste recycler."
        ]]
    },

    phone: {
        working: ["Reuse, sell, or donate", [
            "Back up your important data.",
            "Sign out of your accounts and reset the phone.",
            "Sell, donate, or pass it on for reuse."
        ]],
        repair: ["Repair and extend its life", [
            "Check whether the battery, screen, or charging port needs repair.",
            "Compare the repair cost with the phone's value.",
            "Repair and continue using it if practical."
        ]],
        broken: ["Recycle as electronic waste", [
            "Do not throw the phone into regular household waste.",
            "Remove personal data if the phone still allows it.",
            "Take it to an authorised e-waste collection centre."
        ]],
        unknown: ["Check, then reuse or recycle", [
            "Try charging the phone with a suitable charger.",
            "Check whether it can be repaired.",
            "If it cannot be reused, take it to an authorised e-waste recycler."
        ]]
    },

    battery: {
        working: ["Reuse safely", [
            "Check the battery for damage or leakage.",
            "Use it only in a compatible device.",
            "Store it away from heat and moisture."
        ]],
        repair: ["Get professional advice", [
            "Do not open or attempt to repair the battery yourself.",
            "Keep a damaged battery away from heat.",
            "Ask a suitable battery collection centre how to handle it."
        ]],
        broken: ["Arrange safe battery disposal", [
            "Do not place the battery in regular household waste.",
            "Do not puncture, crush, or burn it.",
            "Take it to an appropriate battery collection point."
        ]],
        unknown: ["Check the battery safely", [
            "Look for swelling, leakage, or other visible damage.",
            "Do not use a swollen or damaged battery.",
            "Contact an appropriate battery collection centre."
        ]]
    },

    plastic: {
        working: ["Reuse or repurpose", [
            "Check whether the item is clean and safe to use.",
            "Reuse it for its original purpose where possible.",
            "Consider repurposing it if you no longer need it."
        ]],
        repair: ["Repair and reuse", [
            "Check whether the item can be repaired safely.",
            "Use a suitable repair method.",
            "Continue using it instead of buying a replacement."
        ]],
        broken: ["Check local plastic recycling options", [
            "Separate the plastic from other waste.",
            "Clean it if required by your local recycling service.",
            "Check whether your local collection centre accepts it."
        ]],
        unknown: ["Identify the plastic before disposal", [
            "Look for the plastic identification symbol, if available.",
            "Check whether your local recycling service accepts it.",
            "Reuse it if possible or follow local disposal guidance."
        ]]
    },

    paper: {
        working: ["Reuse or donate", [
            "Reuse blank or usable pages where possible.",
            "Donate books or usable paper materials.",
            "Keep recyclable paper dry and clean."
        ]],
        repair: ["Restore and reuse", [
            "Repair torn pages or covers if practical.",
            "Reuse paper for notes or craft projects.",
            "Donate the item if it is still useful."
        ]],
        broken: ["Recycle paper", [
            "Remove plastic covers or other non-paper materials.",
            "Keep the paper dry and clean.",
            "Use the appropriate paper recycling collection."
        ]],
        unknown: ["Check whether the paper is recyclable", [
            "Separate paper from other materials.",
            "Keep recyclable paper clean and dry.",
            "Follow local guidance for coated or contaminated paper."
        ]]
    },

    clothes: {
        working: ["Donate, sell, or reuse", [
            "Wash the clothes before passing them on.",
            "Donate or sell wearable clothes.",
            "Reuse old fabric for cleaning cloths or craft projects."
        ]],
        repair: ["Repair and wear again", [
            "Check whether a button, seam, or zip needs repair.",
            "Repair the clothing or ask a tailor.",
            "Continue wearing it or donate it when suitable."
        ]],
        broken: ["Reuse fabric or find textile recycling", [
            "Check whether the fabric can be used for cleaning or crafts.",
            "Separate wearable items from unusable fabric.",
            "Look for a textile collection programme in your area."
        ]],
        unknown: ["Sort by usability", [
            "Check whether the clothes are clean and wearable.",
            "Donate or sell wearable items.",
            "Reuse or recycle unusable fabric where local facilities allow."
        ]]
    },

    tube: {
        working: ["Reuse only if safe", [
            "Check the product label to identify the item.",
            "Reuse it only if safe and intended for further use.",
            "Follow the product's disposal instructions."
        ]],
        repair: ["Check whether repair is safe", [
            "Identify what the item contains.",
            "Do not open or repair a hazardous container.",
            "Follow the manufacturer's safety instructions."
        ]],
        broken: ["Dispose of it according to its contents", [
            "Do not puncture or burn the item.",
            "Check the label for hazard warnings.",
            "Contact an appropriate collection service if hazardous contents remain."
        ]],
        unknown: ["Identify the material and contents first", [
            "Read the label, if available.",
            "Do not open an unknown or potentially hazardous container.",
            "Follow local disposal guidance."
        ]]
    },

    other: {
        working: ["Reuse, sell, or donate", [
            "Check whether someone else could use the item.",
            "Clean it and repair minor issues if necessary.",
            "Sell, donate, or pass it on instead of discarding it."
        ]],
        repair: ["Repair before replacing", [
            "Identify the problem.",
            "Check whether a safe, practical repair is possible.",
            "Reuse the item after repair."
        ]],
        broken: ["Find the correct recycling or disposal route", [
            "Identify the item's material.",
            "Check whether its parts can be reused or recycled.",
            "Use a suitable collection centre for special handling."
        ]],
        unknown: ["Identify the item and check its options", [
            "Check the item's label and material.",
            "Look for reuse, repair, or donation options.",
            "Follow local recycling and disposal guidance."
        ]]
    }
};

function escapeHTML(value) {
    const entities = {
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    };

    return String(value ?? "").replace(/[&<>"']/g, char => entities[char]);
}


// IMAGE PREVIEW
if (itemImage && imagePreview) {
    itemImage.addEventListener("change", () => {
        const file = itemImage.files?.[0];

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        if (!file) {
            imagePreview.removeAttribute("src");
            imagePreview.style.display = "none";

            if (uploadPlaceholder) uploadPlaceholder.style.display = "flex";
            if (photoHelp) photoHelp.style.display = "block";

            return;
        }

        const allowedTypes = [
            "image/jpeg",
            "image/png",
            "image/webp"
        ];

        if (!allowedTypes.includes(file.type)) {
            alert("Please select a JPG, PNG or WEBP image.");
            itemImage.value = "";

            imagePreview.removeAttribute("src");
            imagePreview.style.display = "none";

            if (uploadPlaceholder) uploadPlaceholder.style.display = "flex";
            if (photoHelp) photoHelp.style.display = "block";

            return;
        }

        previewUrl = URL.createObjectURL(file);
        imagePreview.src = previewUrl;
        imagePreview.style.display = "block";

        if (uploadPlaceholder) uploadPlaceholder.style.display = "none";
        if (photoHelp) photoHelp.style.display = "none";

        console.log("Image selected:", file.name);
    });
}


async function showResult(identification, condition) {
    if (!resultPanel) return;

    const category = guidance[identification.item]
        ? identification.item
        : "other";

     
let recommendation = guidance[category][condition] || guidance[category].unknown;

let apiRecommendation = null;

const apiCategoryMap = {
    computer: "electronic",
    phone: "electronic",
    tube: null,
    battery: "battery",
    plastic: "plastic",
    paper: "paper",
    clothes: "clothes",
    other: null
};

const apiCategory = apiCategoryMap[category];

if (apiCategory) {
    try {
        const response = await fetch("http://localhost:3000/api/recommendation", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ category: apiCategory })
        });

        if (response.ok) {
            apiRecommendation = await response.json();
        }
    } catch (error) {
        console.warn("Recommendation API unavailable; using local guidance.", error);
    }
}


   const confidence = ["high", "medium", "low"].includes(
    String(identification.confidence).toLowerCase()
)
    ? String(identification.confidence).charAt(0).toUpperCase() +
      String(identification.confidence).slice(1).toLowerCase()
    : "Not available";
    
const destinationTypes = {
    computer: "e-waste collection centre",
    phone: "e-waste collection centre",
    battery: "battery recycling collection centre",
    plastic: "plastic recycling centre",
    paper: "paper recycling centre",
    clothes: "clothes donation and textile recycling centre",
    tube: "bulb and tube light disposal centre",
    other: "reuse and recycling centre"
};

const destinationSearch = destinationTypes[category] || destinationTypes.other;


    resultPanel.innerHTML = `
        <div class="result-content">
            <p class="result-label">AI IDENTIFICATION</p>
            <h2>${escapeHTML(identification.itemName || "Unknown item")}</h2>
            <p>${escapeHTML(identification.description || "No additional description available.")}</p>

            <div class="result-details">
                <p><strong>Condition:</strong> ${escapeHTML(condition)}</p>
                <p><strong>AI confidence:</strong> ${escapeHTML(confidence)}</p>
            </div>

            <div class="recommendation">
                <p class="result-label">RECOMMENDED NEXT STEP</p>
                
<h3>${escapeHTML(apiRecommendation?.action || recommendation[0])}</h3>
<ol>
    ${
        apiRecommendation
            ? `<li>${escapeHTML(apiRecommendation.instructions)}</li>
               <li>Suggested destination: ${escapeHTML(apiRecommendation.destination)}</li>`
            : recommendation[1].map(step => `<li>${escapeHTML(step)}</li>`).join("")
    }
</ol>

            </div>

            <p class="result-disclaimer">
                AI suggestions may be incorrect. Check local recycling rules
                and safety instructions before acting.
            </p>
            
<button
    type="button"
    class="primary-btn"
    onclick="document.getElementById('destinations').scrollIntoView({ behavior: 'smooth' })"
>
    Find destination for your item ↓
</button>


            <button type="button" id="tryAgainButton" class="primary-btn">
                Analyse another item ↻
            </button>
        </div>
    `;

    resultPanel.style.display = "block";

    document.getElementById("tryAgainButton")?.addEventListener("click", () => {
        sortForm?.reset();

        imagePreview.removeAttribute("src");
        imagePreview.style.display = "none";

        if (uploadPlaceholder) uploadPlaceholder.style.display = "flex";
        if (photoHelp) photoHelp.style.display = "block";

        resultPanel.innerHTML = `
            <div class="result-placeholder">
                <h3>Let's find a better way.</h3>
                <p>Upload an item photo and choose its condition to explore your next step.</p>
            </div>
        `;

        if (previewUrl) {
            URL.revokeObjectURL(previewUrl);
            previewUrl = null;
        }

        itemImage?.focus();
    });

    resultPanel.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });
}


// FORM SUBMISSION — PREVENTS PAGE REFRESH
if (sortForm) {
    sortForm.addEventListener("submit", async event => {
        event.preventDefault();

        const file = itemImage?.files?.[0];
        const condition = itemCondition?.value;

        if (!file) {
            alert("Please upload an image first.");
            return;
        }

        if (!condition) {
            alert("Please select the item's condition.");
            itemCondition?.focus();
            return;
        }

        const originalText = analyzeButton?.innerHTML;

        if (analyzeButton) {
            analyzeButton.disabled = true;
            analyzeButton.textContent = "Analysing your item...";
        }

        try {
            const formData = new FormData();
            formData.append("image", file);
const response = await fetch("http://localhost:3000/api/identify", {
    method: "POST",
    body: formData
});

            const data = await response.json();

            if (!response.ok || !data.success || !data.identification) {
                throw new Error(
                    data.message || "Unable to identify the item. Please try again."
                );
            }

            const identification = data.identification;

            if (
                itemType &&
                [...itemType.options].some(option => option.value === identification.item)
            ) {
                itemType.value = identification.item;
            }

            await showResult(identification, condition);

        } catch (error) {
            console.error("SortMix error:", error);

            alert(
                "Could not analyse the image. Check that your backend is running, then try again."
            );

        } finally {
            if (analyzeButton) {
                analyzeButton.disabled = false;
                analyzeButton.innerHTML = originalText || "Find my item's next step";
            }
        }
    });
}


document.getElementById("findOptions").addEventListener("click", function () {
    const location = document.getElementById("userLocation").value.trim();
    const results = document.getElementById("destinationResults");

    if (!location) {
        results.innerHTML = "<p>Please enter your city or PIN code.</p>";
        return;
    }

    // Read the identified item from the AI result panel
    const resultPanel = document.getElementById("resultPanel");
    const identifiedItem =
        document.getElementById("itemName")?.textContent ||
        document.getElementById("identifiedItem")?.textContent ||
        resultPanel?.textContent ||
        "";

    const item = identifiedItem.toLowerCase();

    let searchType = "recycling centre";
    let heading = "♻️ Recycling options";
    let description = "Explore recycling centres that may accept your item.";

    if (
        item.includes("battery") ||
        item.includes("electronic") ||
        item.includes("computer") ||
        item.includes("laptop") ||
        item.includes("phone")
    ) {
        searchType = "e-waste collection centre";
        heading = "🔋 E-waste collection";
        description = "Find collection centres that may accept electronic items.";
    } else if (
        item.includes("cloth") ||
        item.includes("shirt") ||
        item.includes("dress") ||
        item.includes("fabric")
    ) {
        searchType = "clothes donation centre";
        heading = "👕 Clothing donation";
        description = "Find places that may accept reusable clothes.";
    } else if (
        item.includes("plastic") ||
        item.includes("bottle")
    ) {
        searchType = "plastic recycling centre";
        heading = "♻️ Plastic recycling";
        description = "Find places that may accept plastic items.";
    } else if (
        item.includes("paper") ||
        item.includes("cardboard")
    ) {
        searchType = "paper recycling centre";
        heading = "📄 Paper recycling";
        description = "Find places that may accept paper and cardboard.";
    }

    const city = encodeURIComponent(location);
    const itemSearch = encodeURIComponent(searchType);

    results.innerHTML = `
        <h3>Explore options near ${location}</h3>

        <div class="destination-card">
            <h4>${heading}</h4>
            <p>${description}</p>
            <a href="https://www.google.com/maps/search/${itemSearch}+near+${city}"
               target="_blank" rel="noopener noreferrer">
                Find nearby options ↗
            </a>
        </div>

        <div class="destination-card">
            <h4>🔄 Reuse and donation</h4>
            <p>Explore places that may accept reusable items.</p>
            <a href="https://www.google.com/maps/search/${encodeURIComponent("reuse and donation centres")}+near+${city}"
               target="_blank" rel="noopener noreferrer">
                Explore reuse options ↗
            </a>
        </div>

        <p class="destination-note">
            These are map searches, not verified listings. Confirm that a centre
            accepts your specific item before visiting.
        </p>
    `;
});
