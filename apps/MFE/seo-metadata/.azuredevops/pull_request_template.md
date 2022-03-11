[15263 - SEO Metadata UI: Create endpoints]

#### 📲 What

SEO Metadata UI: Create endpoints

#### 🤔 Why

Why it's needed, background context.

#### 🛠 How

More in-depth discussion of the change or implementation.

#### 👀 Evidence

Screenshots / external resources / links / etc.
Link to documentation updated with changes impacted in the PR

This Task is responsible for providing the below information for the given endpoints
1: Heading
2: Metadata 


1: Heading
http://localhost:3000/seo/seo-headings?urlPath=shop%2Fgender-women-productaffiliation-accessories%2Fcategory-bags

Go to ViewSource > you will see
<h1>Women's Bags</h1>

2: Metadata
http://localhost:3000/seo/seo-metadata?urlPath=shop%2Fgender-women-productaffiliation-accessories%2Fcategory-bags

Go to ViewSource > you will see
<meta name="description" content="Punctuate your look with bags & handbags from our range. Carry your essentials in style with ladies clutch & leather bags. Next day delivery & free returns available."/>
<meta name="keywords" content=""/>
<meta name="robots" content=""/>

#### 🕵️ How to test

Notes for QA

Please see above uri, and use it for the sandbox or any other environment


#### ✅ Acceptance criteria Checklist

- [ ] Code peer reviewed?
- [ ] Documentation has been updated to reflect the changes?
- [ ] Passing all automated tests, including a successful deployment?
- [ ] Passing any exploratory testing?
- [ ] Rebased/merged with latest changes from development and re-tested?
- [ ] Meeting the Coding Standards?
