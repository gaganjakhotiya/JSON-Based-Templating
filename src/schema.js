module.exports = {
    "basic!": {
        "name!": "string",
        "mobile!": "number",
        "email!": "string",
        "picture": "string",
        "website": "string",
        "summary": "string",
        "location!": {
            "address!": "string",
            "city!": "string",
            "country!": "string",
            "pincode!": "string",
            "__template": `
                <span class="location">\${address}, \${city}, \${country}, PIN: \${pincode}</span>
            `
        },
        "profiles": {
            "github": "string",
            "linkedin": "string",
            "__template": `
                <div class="profiles">
                    <ul>
                        <li><a href="\${github}">Github</a></li>
                        <li><a href="\${linkedin}">LinkedIn</a></li>
                    </ul>
                </div>
            `
        },
        "__template": `
            <div class="basic">
                <h1>\${name}</h1>
                <hr/>
                <p>\${summary}</p>
                <p>Mobile: \${mobile}, E-Mail: \${email}</p>
                <p>Address: \${location}</p>
                <p>\${profiles}</p>
            </div>
        `
    },
    "work": [{
        "company!": "string",
        "position!": "string",
        "startDate!": "string",
        "endDate": "string",
        "website": "string",
        "summary": "string",
        "__template": `
            <div class="work">
                <h2>Work</h2>
                <h4>\${company}</h4>
                <p>\${startDate} - \${position}</p>
                <p><a href="\${website}">\${company} website</a></p>
            </div>
        `
    }],
    "education!": [{
        "school!": "string",
        "area": "string",
        "degree": "string",
        "startDate": "string",
        "endDate": "string",
        "score": "number",
        "courses": "string[]",
        "courses__template": "<li>${value}</li>",
        "__template": `
            <div class="education">
                <h4>\${school}</h4>
                <p>\${area}</p>
                <ul>\${courses}</ul>
            </div>
        `
    }],
    "volunteer": [{
        "organization!": "string",
        "position!": "string",
        "startDate!": "string",
        "endDate!": "string",
        "website": "string",
        "summary": "string"
    }],
    "awards": [{
        "title!": "string",
        "string": "string",
        "awarder": "string",
        "summary": "string"
    }],
    "skills!": [{
        "name!": "string",
        "level": "string",
        "keywords": "string[]"
    }],
    "languages!": [{
        "name!": "string",
        "level": "string"
    }],
    "interests": [{
        "name!": "string",
        "keywords": "string[]"
    }],
    "references": [{
        "name!": "string",
        "note!": "string"
    }],
    "work__template": "<div>${value}</div>",
    "education__template": "<div>${value}</div>",
    "volunteer__template": "<div>${value}</div>",
    "awards__template": "<div>${value}</div>",
    "skills__template": "<div>${value}</div>",
    "languages__template": "<div>${value}</div>",
    "interests__template": "<div>${value}</div>",
    "references__template": "<div>${value}</div>",
    "__template": `
        <div>\${basic}</div>
        <div>\${work}</div>
        <div>\${education}</div>
        <div>\${volunteer}</div>
        <div>\${awards}</div>
        <div>\${skills}</div>
        <div>\${languages}</div>
        <div>\${interests}</div>
        <div>\${references}</div>
    `
}