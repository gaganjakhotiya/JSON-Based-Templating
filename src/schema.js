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
        "area!": "string",
        "degree!": "string",
        "score!": "number",
        "startDate": "string",
        "endDate": "string",
        "courses": "string[]",
        "courses__template": "<li>${value}</li>",
        "__template": `
            <div class="education">
                <h4>\${school}</h4>
                <p>\${degree}, \${area}, \${score}</p>
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
        "summary": "string",
        "__template": `
            <div class="volunteer">
                <h4>\${organization}</h4>
                <h5>\${position}</h5>
                <p>\${startDate} - \${endDate}</p>
                <p>Link: \${website}</p>
                <p>\${summary}</p>
            </div>
        `
    }],
    "awards": [{
        "title!": "string",
        "date": "string",
        "awarder": "string",
        "summary": "string",
        "__template": `
            <div class="award">
                <h3>\${title}</h3>
                <span>\${date} \${awarder}</span>
                <span>\${summary}</span>
            </div>
        `
    }],
    "skills!": [{
        "name!": "string",
        "level": "string",
        "keywords": "string[]",
        "keywords__template": `\${value} `,
        "__template": `
            <div class="award">
                <div><em>\${name}</em> - \${level}</div>
                <sup>\${keywords}</sup>
            </div>
        `
    }],
    "languages!": [{
        "name!": "string",
        "level": "string",
        "__template": `
            <div class="language">
                <p>
                    <em>\${name}</em> - <span>\${level}<span>
                </p>
            </div>
        `
    }],
    "interests": [{
        "name!": "string",
        "keywords": "string[]",
        "__template": `
            <div class="interest">
                <h3>\${name}</h3>
                <span>\${level}<span>
            </div>
        `
    }],
    "references": [{
        "name!": "string",
        "note!": "string",
        "__template": `
            <div class="reference">
                <h3>\${name}</h3>
                <span>\${note}<span>
            </div>
        `
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
        <div>
            <h2>Education</h2>
            \${education}
        </div>
        <div>\${volunteer}</div>
        <div>\${awards}</div>
        <div>
            <h2>Skills</h2>
            \${skills}
        </div>
        <div>
            <h2>Languages</h2>
            \${languages}
        </div>
        <div>\${interests}</div>
        <div>\${references}</div>
    `
}