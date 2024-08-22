export const facts: string[] = [
    "Using reusable water bottles helps reduce the 8 million metric tons of plastic entering our oceans annually, protecting marine life and ecosystems.",
    "A single mature rainforest tree can absorb up to 48 pounds of CO2 annually and provide enough oxygen for two people.",
    "Switching to energy-efficient LED bulbs can reduce your carbon footprint by up to 40%. LEDs use 75% less energy and last 25 times longer than incandescent lightbulbs.",
    "Choosing sustainably sourced seafood can lead to a 60% increase in fish populations.",
    "Using a reusable water bottle can save up to 1,460 plastic bottles a year.",
    "Protecting forests can help prevent the loss of 18 million acres of trees annually.",
    "Using public transport once a week can reduce your carbon footprint by 20%. Public Transportation in the U.S. saves 37 million tons of carbon dioxide annually.",
    "By eating a plant-based meal just once a week, you can save approximately 1,200 gallons of water.",
    "Replacing 20 incandescent bulbs with LEDs can save you $200 annually.",
    "Recycling just one aluminum can saves enough energy to power a TV for three hours.",
    "Carpooling to work just 1 day per week cuts commuting emissions by 20% per person.",
    "An area of land the size of Portugal is deforested every year.",
    "The Arctic is heating much more quickly than the rest of the Earth. Today's Arctic ice area is -9.61% from the historic average.",
    "Wasted food is responsible for 8% of global emissions.",
    "Solar energy costs have dropped over 70% since 2010.",
    "You can cut your vehicle emissions by 42.9% when switching to electric.",
    "In 2023, renewable energy contributed to over 43% of the global electric capacity.",
    "Composting food waste reduces household waste by 30%.",
    "Buying second-hand clothing reduces carbon footprint by up to 60%.",
    "Reducing shower time by 2 minutes saves 1,825 gallons of water annually.",
    "Reducing thermostat by 2 degrees in winter saves 10% on heating bills and cuts emissions by 2,000 pounds annually.",
    "A reusable shopping bag can eliminate the use of up to 500 plastic bags per person each year.",
    "Planting a tree absorbs up to 48 pounds of CO2 annually.",
    "Recycling paper can save up to 60% of the energy needed to make new paper.",
    "Plastics require 100 to 400 years to break down at the landfill.",
    "It takes approximately 1 million years for a glass bottle to break down at the landfill.",
    "20 companies are the source of more than half of the world’s single-use plastic waste.",
    "Using cold water for laundry can save up to 90% of the energy used.",
    "One ton of recycled paper saves 17 trees, 7,000 gallons of water, and 4,000 kWh of energy.",
    "The global market for green technology and sustainability is projected to grow to USD 134.9 billion by 2030.",
    "Up to 28,000 species can go extinct in the next quarter century due to deforestation.",
    "Sustainable funds account for 7.2% of global AUM in 2023.",
    "Aluminum can be recycled using less than 5 percent of the energy used to make the original product.",
    "In 2023, the U.S. experienced 28 separate weather and climate disasters costing at least 1 billion dollars.",
    "Americans use 2,500,000 plastic bottles every hour.",
    "67% of every dollar spent at small businesses stays in the local community.",
    "Superbowl LVIII was powered using 100% renewable energy.",
    "5% of the world's people generate 40% of the world's waste.",
    "8.43 million premature deaths are attributed to air pollution annually.",
    "Biking instead of driving just once a day can reduce your carbon footprint by 67%.",
    "The carbon footprint of training a LLM is roughly 620,000 lbs of CO2.",
    "Carefully positioned trees can reduce a household's energy consumption by up to 25%.",
    "173,000 terawatts of solar energy continuously strike the Earth.",
    "Recycling plastic saves twice as much energy as burning it in an incinerator.",
    "Planting a garden can reduce household carbon footprints by up to 68 pounds of CO2 annually.",
    "A single meatless day per week can reduce an individual's carbon footprint by 400 pounds per year.",
    "Installing a low-flow showerhead can save up to 2,700 gallons of water per person annually.",
    "Over 50 million tons of electronic waste are generated globally each year, with only 20% being recycled.",
    "Ocean acidification is increasing by about 30% since the beginning of the Industrial Revolution, threatening marine life.",
    "Hydroponic farming uses 70% less water than traditional soil-based agriculture.",
    "One bamboo plant can sequester 2 tons of carbon dioxide in just 7 years.",
    "Hydro plants are the most efficient power plants with a 90% efficiency rate.",
    "Green roofs can reduce building energy costs by up to 30% by providing natural insulation.",
    "In the United States, honey bees and wild bees contribute $20 billion each to agriculture and industries that depend on agriculture.",
    "Barclays Capital in the UK has saved £200,000 through office paper efficiency measures that have cut in-house paper use by 48.1%.",
    "There have been 377 climate disasters since 1980."
  ];

  export const getRandomFact = (): string => {
    const randomIndex: number = Math.floor(Math.random() * facts.length);
    return facts[randomIndex];
  };