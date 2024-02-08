//
// For guidance on how to create filters see:
// https://prototype-kit.service.gov.uk/docs/filters
//

const govukPrototypeKit = require('govuk-prototype-kit')
const addFilter = govukPrototypeKit.views.addFilter

// Add your filters here

// Add the filter to Nunjucks
addFilter('formatUKPostcode', function (content) {
  // Remove any non-alphanumeric characters and convert to uppercase
  let cleanContent = content.replace(/[^a-z0-9]/gi, '').toUpperCase();

  // Regular expression for UK postcode
  const regex = /^([A-Z]{1,2}[0-9][0-9A-Z]?)([0-9][A-Z]{2})$/;

  // Check if the cleaned content matches the pattern
  const match = cleanContent.match(regex);
  if (match) {
    // Format and return the postcode
    return match[1] + " " + match[2];
  }

  // If it doesn't match the pattern, return the original content
  return content;
});

addFilter('uppercase', function (content) {
  return content.toUpperCase()
})

// filter to turn status text into a tage
addFilter('tag', function (content) {
  let colour = 'grey'
  if (content === 'Incomplete') {
    colour = 'blue'
  } else if (content === 'Sent') {
    colour = 'green'
  } else if (content === 'Rejected' || content === 'Failed') {
    colour = 'red'
  } else if (content === 'Expired') {
    colour = 'red'
  } else if (content === 'Reimbursable') {
    colour = 'green'
  }
  let tagCode = '<strong class="govuk-tag govuk-tag--'+ colour +'">' + content + '</strong>'
  return tagCode
})

// swap hypens for slashes in date output
addFilter('changeDateFormat', function (dateString) {
  const match = dateString.match(/^(\d{4})-(\d{2})-(\d{2})$/);
  return match ? `${match[3]}/${match[2]}/${match[1]}` : dateString;
})

