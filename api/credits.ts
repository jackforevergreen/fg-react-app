import { CarbonCredit } from "@/types";

export const fetchCredits = async () => {
  const credits: CarbonCredit[] = [
    {
      id: "cc_vcs_ew_can_0000929",
      name: "Canadian Energy and Waste",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fg-react-app.appspot.com/o/carbonCredits%2Fcanadian-energy-and-waste.png?alt=media&token=b9317997-bce5-4458-9b82-b53de0b6bb27",
      colors: ["#FEF1AD", "#D2C78D", "#F4CD43"],
      price: 100,
      details: [
        {
          title: "Project Overview",
          content:
            "The Quebec Sustainable Community Project is a comprehensive initiative aimed at enhancing energy efficiency and solid waste diversion across various facilities within the Province of Quebec. By leveraging a consolidated Information and Communication Technology-enabled data monitoring system, this project effectively tracks and quantifies emissions reductions, aligning with best practices for sustainability.",
        },
        {
          title: "Key Features",
          content:
            "Location: Client Facilities across the Province of Quebec, Canada. \nStandards: Verified Carbon Standard (VCS) and Climate, Community and Biodiversity Standard (CCBS) certified. \nCommunity Involvement: This project is developed in collaboration with local businesses and organizations, supporting single-window reporting and measurement provided by a third party to ensure accurate emissions reductions quantification. \nImpact: The project aims to group up to 10,000 Client Facilities within a Sustainable Community or cluster, achieving a potential reduction of 22,852,000 tCO2e over the period from 2010 to 2020.",
        },
        {
          title: "Your Purchase",
          content:
            "Your purchase of the Quebec Sustainable Community Project | VCS929 ensures that 1 metric ton of CO2 is neutralized through advanced energy efficiency and waste management practices. These credits have already been retired under the Forevergreen Organization. Upon completing your purchase, you will be awarded a certificate of offset, detailing the specifics of the contribution made towards fighting climate change through your chosen project. You will also receive a personalized certificate from Forevergreen via email.",
        },
      ],
      registry: [
        {
          title: "Verra's Registry",
          link: "https://registry.verra.org/app/projectDetail/VCS/929",
        },
      ],
      CTA: "Embrace a greener future today with Forevergreen Sustainable Community Carbon Credits.",
    },
    {
      id: "cc_cer_hy_idn_0007096",
      name: "Pamona Hydroelectric",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fg-react-app.appspot.com/o/carbonCredits%2Fpanoma-hydroelectric.png?alt=media&token=aaf69562-8d24-4671-a1af-001267f30d0f",
      colors: ["#97FFFF", "#88DDE2", "#6FD2F2"],
      price: 100,
      details: [
        {
          title: "Project Overview",
          content:
            "The Pamona 2 Hydroelectric Power Plant Project is a 195 MW run-of-river hydro project located on the Poso River in Central Sulawesi Province, Indonesia. Developed by PT Poso Energy, this project supplies zero-emission power to the West, South, and South-East Sulawesi grid, effectively displacing fossil fuel-fired power generation in the region.",
        },
        {
          title: "Key Features",
          content:
            "Location: Poso River, Central Sulawesi Province, Indonesia. \nStandards: UN CERs \nCommunity Involvement: The project contributes to local social and economic development by creating employment opportunities during both construction and operation phases. Additionally, free electricity is provided to local communities, improving their standard of living and supporting small industries. \nImpact: The project reduces greenhouse gas emissions by approximately 608,090 tCO2 per year during the first crediting period. It also improves air quality by reducing reliance on fossil fuel power plants.",
        },
        {
          title: "Your Purchase",
          content:
            "Your purchase of the Pamona 2 Hydroelectric Power Plant Project ensures that 1 metric ton of CO2 is neutralized through sustainable hydropower practices. These credits have already been retired under the Forevergreen Organization. Upon completing your purchase, you will be awarded a certificate of offset, detailing the specifics of your contribution to fighting climate change through your chosen project. You will also receive a personalized certificate from Forevergreen via email.",
        },
      ],
      registry: [
        {
          title: "CDM Registry",
          link: "https://cdm.unfccc.int/Projects/DB/RWTUV1346067853.34/view?cp=1",
        },
      ],
      CTA: "Embrace a greener future today with Forevergreen Hydroelectric Carbon Credits.",
    },
    {
      id: "cc_bcr_ar_col_26114001",
      name: "The Russas Project",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fg-react-app.appspot.com/o/carbonCredits%2Fthe-russas-project.png?alt=media&token=587c32ad-afa5-4a2a-86cb-3d7e6ddfc5a2",
      colors: ["#93F302", "#6FB802", "#558D01"],
      price: 100,
      details: [
        {
          title: "Project Overview",
          content:
            "The Russas Project is a pioneering reforestation initiative dedicated to the protection and conservation of tropical forests located on southern bank of the Valparaiso River in the State of Acre Brazil. By offering payments for ecosystem services, this project aims to significantly reduce deforestation and forest degradation, aligning with the Reducing Emissions from Deforestation and forest Degradation (REDD) framework.",
        },
        {
          title: "Key Features",
          content:
            "Location: Privately-owned property in Acre, Brazil. \nStandards: Verified Carbon Standard (VCS) and Climate, Community and Biodiversity Standard (CCBS) certified. \nCommunity Involvement: Development and implementation of the project have been conducted in collaboration with local communities and Acre state officials to ensure sustainable and beneficial outcomes. \nImpact: The project activities are designed to lower the pressure on land and forest resources, resulting in substantial emission reductions.",
        },
        {
          title: "Your Purchase",
          content:
            "Your purchase of the Russas Project | VCS1112 ensures that 1 metric ton of CO2 is neutralized through natural, sustainable reforestation practices. These credits have already been retired under the Forevergreen Organization. Upon completing your purchase, you will be awarded a certificate of offset, detailing the specifics of the contribution made towards fighting climate change through your chosen project. You will also receive a personalized certificate from Forevergreen via email. ",
        },
      ],
      registry: [
        {
          title: "Verra's Registry",
          link: "https://registry.verra.org/app/projectDetail/VCS/1112",
        },
      ],
      CTA: "Embrace a greener future today with Forevergreen Reforestation Carbon Credits",
    },
    {
      id: "cc_vcs_rf_bra_0001112",
      name: "Columbian Reforestation",
      image:
        "https://firebasestorage.googleapis.com/v0/b/fg-react-app.appspot.com/o/carbonCredits%2Fcolombian-reforestation.png?alt=media&token=805775e6-6043-45f4-8711-6e02c6d14800",
      colors: ["#029C45", "#01612B", "#015827"],
      price: 100,
      details: [
        {
          title: "Project Overview",
          content:
            "The Project for Forestry Restoration in Productive and Biological Corridors in the Eastern Plains of Colombia aims to leverage the international carbon market to drive investments in new commercial forest plantations and the restoration of natural forests in the remote High Orinoco region of Colombia. By transforming land use from extensive cattle ranching to sustainable forest production systems, this project seeks to restore natural forest cover and create a landscape of biological and productive corridors, delivering financial, social, and environmental benefits to the region.",
        },
        {
          title: "Key Features",
          content:
            "Location: High Orinoco region, Eastern Plains of Colombia. \nStandards: CDM - AR-ACM0003 (Afforestation and reforestation of lands except wetlands). \nCommunity Involvement: The project involves multiple stakeholders, including Organización La Primavera S.A., Bosques de la Orinoquía S.A., and other local organizations, contributing to social and economic development through job creation and sustainable land use practices. \nImpact: The project is expected to reduce or remove 5,559,630 tCO2 over its quantification period from 2005 to 2065. It promotes environmental restoration, improves biodiversity, and supports local communities.",
        },
        {
          title: "Your Purchase",
          content:
            "Your purchase of the Forestry Restoration in Productive and Biological Corridors Project ensures that 1 metric ton of CO2 is neutralized through sustainable forestry practices. These credits have already been retired under the Forevergreen Organization. Upon completing your purchase, you will be awarded a certificate of offset, detailing the specifics of the contribution made towards fighting climate change through your chosen project. You will also receive a personalized certificate from Forevergreen via email.",
        },
      ],
      registry: [
        {
          title: "CDM Registry",
          link: "https://globalcarbontrace.io/projects/22/",
        },
      ],
      CTA: "Embrace a greener future today with Forevergreen Forestry Carbon Credits.",
    },
  ];
  return credits;
};
