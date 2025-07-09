const events = [
    { date: "2006", title: "Tesla Motors secured major funding", description: "The year 2006 was a busy one for Tesla.After two years of strategizing and tinkering, Elon Musk spearheaded two new rounds of funding. Series B raised $13 million and added Valor Equity Partners to the funding team, previously composed of Musk, Compass Technology Partners and SDL Ventures.few months later, Musk co-led the Series C round, raking in $40 million from prominent figures like Google co-founders Larry Page and Sergey Brin, JPMorgan Chase’s Bay Area Equity Fund and former eBay president Jeff Skoll.Musk would later champion a fourth funding round in May 2007, bringing total private financing to $105 million.",image:"funding.jpg" },
    { date: "2008", title: "Launch of roadster", description: "Despite the 2008 launch of the Roadster, by 2009, Tesla faced significant financial problems. The company had less than $10 million in cash on hand, potentially less than it needed to even deliver on the cars it had already sold", image: "2008roadster.webp" },
    { date: "2010", title: "Tesla Motors filed Form S-1 with the SEC", description: "Tesla’s Form S-1 filing indicated the firm’s intentions to file an IPO, underwritten by financiers Morgan Stanley, JPMorgan, Goldman Sachs and Deutsche Bank Securities.", image:"SEC.webp"},
    { date: "2011", title: "Launch of Model Type S", description: "In 2008, Tesla also announced its first attempt to lower the cost of its products. The Model S sedan would retail for $76,000, which was three-quarters of the price of the Roadster", image:"2011model type s.webp" },
    { date: "2012", title: "Tesla launched charging stations", description: "In 2012, Tesla opened its first free-standing charging stations, the Superchargers, in California. These stations, which eventually numbered around 1,000 globally, offered free charge-ups to Tesla owners at a faster clip than regular wall outlets.",image:"charging.webp" },
    { date: "2013", title: "Tesla turned its first profit", description: "On 8 May 2013, Tesla reported its first-ever quarterly profit. The next day, the stock opened 25.5% higher before peaking at 8.1% gains intraday.",image:"profit.jpg" },
    { date: "2016", title: "The Autopilot 8.0 debuted", description: "Autopilot Software Version 8.0 was the culmination of months of data gathering by beta testers and Tesla teams. The software upgraded the car’s navigation systems, offered 3D signal processing, and improved visual feedback and Autosteer response.",image:"autopilot.webp" }
  ];

  // Create tooltip element
  const tooltip = document.createElement('div');
  tooltip.id = 'timeline-tooltip';
  tooltip.className = 'absolute z-50 bg-white border border-gray-300 rounded shadow-lg px-4 py-2 text-gray-800 text-sm pointer-events-none transition-opacity duration-150 opacity-0';
  tooltip.style.minWidth = '180px';
  tooltip.style.maxWidth = '250px';
  tooltip.style.display = 'none';
  document.body.appendChild(tooltip);

  // Render timeline
  const timeline = document.getElementById('timeline');
  events.forEach((event, idx) => {
    const li = document.createElement('li');
    li.className = "mb-8 flex items-center cursor-pointer relative";
    li.innerHTML = `
      <div class="flex flex-col items-center mr-4">
      <img src="${event.image}" alt="Event image" class="w-12 h-12 object-cover rounded-full border-2 border-black mb-2" />
        <div class="w-10 h-10 bg-blue-500 text-white flex items-center justify-center rounded-full font-bold">${event.date}</div>
        ${idx < events.length - 1 ? '<div class="h-8 w-1 bg-blue-300"></div>' : ''}
      </div>
      <div>
        <div class="font-semibold text-lg">${event.title}</div>
      </div>
    `;
    li.onclick = () => showPopup(event);

    // Hover preview handlers
    li.onmouseenter = (e) => showTooltip(event, e);
    li.onmousemove = (e) => moveTooltip(e);
    li.onmouseleave = hideTooltip;

    timeline.appendChild(li);
  });

  // Tooltip logic
  function showTooltip(event, e) {
    tooltip.innerHTML = `<strong>${event.title}</strong><br><span>${event.description}</span>`;
    tooltip.style.display = 'block';
    tooltip.style.opacity = '1';
    moveTooltip(e);
  }
  function moveTooltip(e) {
    // Position tooltip near the mouse, but not off-screen
    const padding = 12;
    let left = e.pageX + padding;
    let top = e.pageY - tooltip.offsetHeight / 2;
    // Prevent overflow right
    if (left + tooltip.offsetWidth > window.innerWidth) {
      left = window.innerWidth - tooltip.offsetWidth - padding;
    }
    // Prevent overflow top/bottom
    if (top < 0) top = padding;
    if (top + tooltip.offsetHeight > window.innerHeight) {
      top = window.innerHeight - tooltip.offsetHeight - padding;
    }
    tooltip.style.left = left + 'px';
    tooltip.style.top = top + 'px';
  }
  function hideTooltip() {
    tooltip.style.opacity = '0';
    tooltip.style.display = 'none';
  }

  // Popup logic (unchanged)
  function showPopup(event) {
    document.getElementById('popup').classList.remove('hidden');
    document.getElementById('popup-content').innerHTML = `
      <h2 class="font-bold text-xl mb-2">${event.title} (${event.date})</h2>
      <p>${event.description}</p>
    `;
  }
  function closePopup() {
    document.getElementById('popup').classList.add('hidden');
  }
