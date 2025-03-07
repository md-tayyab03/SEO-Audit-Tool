import React, { useState } from 'react';
import './App.css';
 const HtmlSeoChecker = () => {
  const [focusKeyword, setFocusKeyword] = useState('');
  const [domainUrl, setDomainUrl] = useState('');
  const [htmlCode, setHtmlCode] = useState('');
  const [result, setResult] = useState('');

  const extractTitleContent = (html) => {
    const titleStartIndex = html.indexOf("<title>") + 7;
    const titleEndIndex = html.indexOf("</title>");
    return (titleStartIndex !== -1 && titleEndIndex !== -1) ?
      html.substring(titleStartIndex, titleEndIndex).trim() :
      "";
  };

  const extractDescriptionContent = (html) => {
    const descStartIndex = html.indexOf('<meta name="description" content="') + 33;
    const descEndIndex = html.indexOf('">', descStartIndex);
    return (descStartIndex !== -1 && descEndIndex !== -1) ?
      html.substring(descStartIndex, descEndIndex).trim() :
      "";
  };

  const checkKeyword = () => {
    // Rest of your existing checkKeyword function logic goes here
    // ...
{
    var focusKeyword = document.getElementById("focusKeyword").value.trim();
    var htmlCode = document.getElementById("htmlCode").value.trim();

            // Check if there is no HTML code in the body
            if (!htmlCode) {
              resultElement.innerHTML = "<p class='red'>&#10006; No HTML code found.</p>";
              return; // Stop further processing
          }

    // Extract content within <title> tags
    var titleContent = extractTitleContent(htmlCode);

    // Extract content within <meta name="description"> tags
    var descriptionContent = extractDescriptionContent(htmlCode);

    // Display length of content within title
    console.log("Length of content within <title> tags: " + titleContent.length);

    var titleStart = titleContent.substring(0, 30);
    var len = titleContent.length;

    var resultElement = document.getElementById("result");

    // Check focus keyword in title
    if (titleStart.toLowerCase().includes(focusKeyword.toLowerCase())) {
        resultElement.innerHTML = "<p class='green'>&#10004; Focus keyword matched at the beginning of the title</p>";
    } else if (titleStart.toUpperCase().includes(focusKeyword.toUpperCase())) {
        resultElement.innerHTML = "<p class='green'>&#10004; Focus keyword matched at the beginning of the title</p>";
    } else {
        resultElement.innerHTML = "<p class='red'>&#10006; Focus keyword not found in the beginning of the title.</p>";
    }

    // Check for a number in the title
    var numberInTitle = /\d/.test(titleContent);
    if (numberInTitle) {
        resultElement.innerHTML += "<p class='green'>&#10004; Number appears in the title: " + numberInTitle + "</p>";
    } else {
        resultElement.innerHTML += "<p class='red'>&#10006; Number doesn't appear in the title.</p>";
    }

    // Check length of title
    if (len < 15) {
        resultElement.innerHTML += "<p class='red'>&#10006; Insufficient length of title</p>";
    } else if (len >= 15 && len < 40) {
        resultElement.innerHTML += "<p class='orange'>&#10004; Sufficient length of title</p>";
    } else if (len >= 40 && len <= 60) {
        resultElement.innerHTML += "<p class='green'>&#10004; Satisfied length of title</p>";
    } else {
        resultElement.innerHTML += "<p class='red'>&#10006; Length of title is more</p>";
    }

    // Check focus keyword in description
    if (descriptionContent.toLowerCase().includes(focusKeyword.toLowerCase())) {
        resultElement.innerHTML += "<p class='green'>&#10004; Focus keyword found in the description</p>";
    } else if (descriptionContent.toUpperCase().includes(focusKeyword.toUpperCase())) {
        resultElement.innerHTML += "<p class='green'>&#10004; Focus keyword found in the description</p>";
    } else {
        resultElement.innerHTML += "<p class='red'>&#10006; Focus keyword not found in the description.</p>";
    }

    // Display length of description
    console.log("Length of content within <meta name='description'> tags: " + descriptionContent.length);

    var descLen = descriptionContent.length;

    // Check length of description
    if (descLen < 80) {
        resultElement.innerHTML += "<p class='red'>&#10006; Insufficient length of description</p>";
    } else if (descLen >= 80 && descLen < 105) {
        resultElement.innerHTML += "<p class='orange'>&#10004; Sufficient length of description</p>";
    } else if (descLen >= 105 && descLen <= 160) {
        resultElement.innerHTML += "<p class='green'>&#10004; Satisfied length of description</p>";
    } else {
        resultElement.innerHTML += "<p class='red'>&#10006; Length of description is more</p>";
    }


    // Count words and calculate keyword density
    var { wordCount, keywordDensity } = calculateKeywordDensity(htmlCode, focusKeyword);

    // Display the results
    resultElement.innerHTML += "<p>Word Count: " + wordCount + "</p>";
    resultElement.innerHTML += "<p>Keyword Density: " + keywordDensity.toFixed(2) + "%</p>"


    // Check if keyword density is within the recommended range
    if (keywordDensity >= 1 && keywordDensity <= 1.5) {
        resultElement.innerHTML += "<p class='green'>&#10004; Keyword density within the recommended range</p>";
    } else if (keywordDensity > 2.5) {
        resultElement.innerHTML += "<p class='red'>&#10006; Keyword density exceeds 2.5%</p>";
    } else {
        resultElement.innerHTML += "<p class='red'>&#10007; Keyword density is outside the recommended range</p>";
    }

// Check for images, embed videos, and videos
    var imageCount = countTags(htmlCode, 'img');
    var embedVideoCount = countTags(htmlCode, 'iframe');
    var videoCount = countTags(htmlCode, 'video');

    // Display the results for images, embed videos, and videos
    if (imageCount === 0 && embedVideoCount === 0 && videoCount === 0) {
        resultElement.innerHTML += "<p class='red'>&#10006; No images or videos found</p>";
    } else if ((imageCount === 1 || embedVideoCount === 1 || videoCount === 1) && (imageCount + embedVideoCount + videoCount) < 4) {
        resultElement.innerHTML += "<p class='orange'>&#10007; Single image or video found</p>";
    } else if (imageCount + embedVideoCount + videoCount >= 4) {
        resultElement.innerHTML += "<p class='green'>&#10004; 4 or more images or videos found</p>";
    }

    // Check for internal links
    var internalLinkCount = countInternalLinks(htmlCode, document.getElementById("domainUrl").value);

    // Display the results for internal links
    if (internalLinkCount === 0) {
        resultElement.innerHTML += "<p class='red'>&#10006; No internal links found</p>";
    } else if (internalLinkCount === 1) {
        resultElement.innerHTML += "<p class='orange'>&#10007; Single internal link found</p>";
    } else if (internalLinkCount >= 4 && internalLinkCount < 8) {
        resultElement.innerHTML += "<p class='green'>&#10004; 4 to 7 internal links found</p>";
    }

    // Display message based on internal link count
    if (internalLinkCount > 0) {
        resultElement.innerHTML += "<p class='green'>&#10004; You are linking to other resources on your website which is great.</p>";
    } else {
        resultElement.innerHTML += "<pclass='red'>&#10006; We found 0 internal links in your content.</pclass=>";
    }

// start external links
     // Check for external links
     var domainUrl = window.location.origin;
     var externalLinks = findExternalLinks(htmlCode, domainUrl);

     // Display the results for external links
     if (externalLinks.length > 0) {
         resultElement.innerHTML += "<p class='green'>&#10004; You are linking to other resources website, which is great.</p>";
     } else {
         resultElement.innerHTML += "<p class='red'>&#10006; We found 0 external links in your content.</p>";
     }

// Check for focus keyword in subheadings (H2, H3, H4, H5, H6)
var subheadingTags = ['h2', 'h3', 'h4', 'h5', 'h6'];
var keywordFoundInSubheadings = subheadingTags.some(function (tag) {
    var tagMatches = htmlCode.match(new RegExp('<' + tag + '.*?>(.*?)<\/' + tag + '>', 'gi'));
    return tagMatches && tagMatches.some(function (match) {
        return match.toLowerCase().includes(focusKeyword.toLowerCase());
    });
});

// Display the results for focus keyword in subheadings
if (keywordFoundInSubheadings) {
    resultElement.innerHTML += "<p class='green'>&#10004; Focus Keyword found in subheading(s) like H2, H3, H4, etc.</p>";
} else {
    resultElement.innerHTML += "<p class='red'>&#10006; Focus Keyword not found in subheading(s) like H2, H3, H4, etc.</p>";
}

 // Check for focus keyword in image alt attributes
 var imageAltMatches = htmlCode.match(/<img.*?alt=["'](.*?)["']/gi);
 var keywordFoundInImageAlt = imageAltMatches && imageAltMatches.some(function (match) {
     return match.toLowerCase().includes(focusKeyword.toLowerCase());
 });

 // Display the results for focus keyword in image alt attributes
 if (keywordFoundInImageAlt) {
     resultElement.innerHTML += "<p class='green'>&#10004; Focus Keyword found in image alt attribute(s)</p>";
 } else {
     resultElement.innerHTML += "<p class='red'>&#10006; Focus Keyword not found in image alt attribute(s)</p>";
 }

            // Check for short paragraphs (less than or equal to 120 words)
            var paragraphMatches = htmlCode.match(/<p>.*?<\/p>/g);
            var longParagraphFound = paragraphMatches && paragraphMatches.some(function (paragraph) {
                var words = paragraph.split(/\s+/);
                return words.length > 120;
            });

            // Display the results for short paragraphs
            if (!longParagraphFound) {
                resultElement.innerHTML += "<p class='green'>&#10004; You are using short paragraphs</p>";
            } else {
                resultElement.innerHTML += "<p class='red'>&#10006; At least one paragraph is long. Consider using short paragraphs.</p>";
            }

            // Check if focus keyword appears in the first 10% of the content (considering only the first paragraph)
            var firstParagraph = extractFirstParagraph(htmlCode);
            var totalContentLength = htmlCode.length;
            var tenPercentThreshold = totalContentLength * 0.1;

            // Display the results for focus keyword in the first 10% of the content
            if (firstParagraph.toLowerCase().includes(focusKeyword.toLowerCase()) && firstParagraph.length <= tenPercentThreshold) {
                resultElement.innerHTML += "<p class='green'>&#10004; Focus Keyword appears in the first 10% of the content.</p>";
            } else {
                resultElement.innerHTML += "<p class='red'>&#10006; Focus Keyword does not appear in the first 10% of the content.</p>";
            }



  }

// Function to extract content of the first paragraph
function extractFirstParagraph(html) {
  var paragraphStartIndex = html.indexOf("<p>") + 3;
  var paragraphEndIndex = html.indexOf("</p>");
  if (paragraphStartIndex !== -1 && paragraphEndIndex !== -1) {
      return html.substring(paragraphStartIndex, paragraphEndIndex).trim();
  }
  return "";
}

// external links start  
// Function to find external links in the HTML code
function findExternalLinks(html, domainUrl) {
  var linkMatches = html.match(/<a\s+(?:[^>]*?\s+)?href\s*=\s*(?:(["'])(?:(?:(?:(?:(?:https?|ftp|file):)?\/\/)|www\.|\/)[^"']+)\1|([^\s>]+))[^>]*>/g);
  var externalLinks = [];

  if (linkMatches) {
      linkMatches.forEach(function (link) {
          var hrefMatch = link.match(/href\s*=\s*(?:(["'])(?:(?:(?:(?:(?:https?|ftp|file):)?\/\/)|www\.|\/)[^"']+)\1|([^\s>]+))/);
          if (hrefMatch) {
              var href = hrefMatch[2] || hrefMatch[3];
              if (href && !href.startsWith(domainUrl)) {
                  externalLinks.push(href);
              }
          }
      });
  }

  return externalLinks;
}
  
// external links end


          // Function to count internal links in the HTML code
          function countInternalLinks(html, domainUrl) {
            var linkMatches = html.match(/<a\s+(?:[^>]*?\s+)?href=(["'])(.*?)\1/gi);
            var internalLinkCount = 0;

            if (linkMatches) {
                linkMatches.forEach(function (link) {
                    var href = link.match(/href=["'](.*?)["']/)[1];
                    if (isInternalLink(href, domainUrl)) {
                        internalLinkCount++;
                    }
                });
            }

            return internalLinkCount;
        }

        // Function to check if a link is internal or external
        function isInternalLink(href, domainUrl) {
            return href.startsWith('#') || href.startsWith('/') || href.startsWith(domainUrl);
        }




         // Function to count occurrences of a tag in the HTML code image
         function countTags(html, tagName) {
            var tagMatches = html.match(new RegExp('<' + tagName, 'gi'));
            return tagMatches ? tagMatches.length : 0;
        }

        // Function to count words in paragraphs and calculate keyword density
        function calculateKeywordDensity(html, keyword) {
          var paragraphMatches = html.match(/<p>.*?<\/p>/g);
          var wordCount = 0;
          var keywordCount = 0;

          if (paragraphMatches) {
              paragraphMatches.forEach(function (paragraph) {
                  var words = paragraph.split(/\s+/);
                  wordCount += words.length;
                  keywordCount += countOccurrences(words, keyword);
              });
          }

          var keywordDensity = (keywordCount / wordCount) * 100;

          return { wordCount, keywordDensity };
      }

      // Function to count occurrences of a word in an array
      function countOccurrences(array, word) {
          return array.filter(function (item) {
              return item.toLowerCase() === word.toLowerCase();
          }).length;
      }



// Function to count internal links in the HTML code
function countInternalLinks(html) {
          var internalLinksMatches = html.match(/<a[^>]*href=["'](?!http[s]?:\/\/)([^"']+)["'][^>]*>/gi);
          return internalLinksMatches ? internalLinksMatches.length : 0;
      }




    // Set the result in state to render in the component
    setResult(resultElement.innerHTML);
  };

  return (
    <div className="container">
      <h1>Search Engine Optimization</h1>

      <label htmlFor="focusKeyword">Focus Keyword:</label>
      <input
        type="text"
        id="focusKeyword"
        placeholder="Enter focus keyword"
        value={focusKeyword}
        onChange={(e) => setFocusKeyword(e.target.value)}
      />

      <br />

      <label htmlFor="domainUrl">Domain URL:</label>
      <input
        type="text"
        id="domainUrl"
        placeholder="Enter domain URL"
        value={domainUrl}
        onChange={(e) => setDomainUrl(e.target.value)}
      />

      <br />

      <br />

      <label htmlFor="htmlCode">HTML Code:</label>
      <textarea
        id="htmlCode"
        placeholder="Enter HTML code"
        value={htmlCode}
        onChange={(e) => setHtmlCode(e.target.value)}
      ></textarea>

      <br />

      <button onClick={checkKeyword}>Check Keyword</button>

      <div className="result" id="result">
        {/* Render the result here */}
        {result && <div dangerouslySetInnerHTML={{ __html: result }} />}
      </div>
    </div>
  );
};




export default HtmlSeoChecker;
