/**
 * Cutty Application Knowledge Base
 * This provides comprehensive documentation about the Cutty app
 * to enable the agent to answer questions without using tools
 */

export const CUTTY_APP_KNOWLEDGE = `
# Cutty Application Knowledge Base

## What is Cutty?
Cutty is a powerful data management application that helps users create, manage, and export synthetic data. It's designed for testing, development, and demonstration purposes where real data cannot be used due to privacy or security concerns.

## Core Features

### 1. Synthetic Data Generation
- **Purpose**: Create realistic but fake data for testing and development
- **Capabilities**: 
  - Generate customizable CSV files with various data types
  - Support for different data formats (names, addresses, dates, numbers)
  - Configurable row counts from 1 to 10,000 records
  - Multiple export formats (CSV, JSON, Excel)

### 2. List Management
- **Purpose**: Organize and manage data collections
- **Features**:
  - Create multiple lists for different projects
  - Import existing CSV files
  - Edit and update list contents
  - Sort and filter capabilities
  - Bulk operations for efficiency

### 3. Data Export
- **CSV Format**: Comma-separated values, compatible with Excel and Google Sheets
- **JSON Format**: Structured data for APIs and applications
- **Direct Download**: Secure download links with temporary access
- **Batch Export**: Export multiple lists at once

### 4. Supported Geographic Regions
Currently supports synthetic data generation for 8 US states:
- California (CA)
- Florida (FL)
- Georgia (GA)
- Illinois (IL)
- New York (NY)
- Ohio (OH)
- Pennsylvania (PA)
- Texas (TX)

## Common Use Cases

### Testing & Development
- Generate test data for application development
- Create sample datasets for demos
- Test data processing pipelines
- Validate import/export functionality

### Education & Training
- Create practice datasets for learning
- Generate examples for documentation
- Build sample databases for tutorials

### Privacy Compliance
- Replace real data with synthetic alternatives
- Maintain data structure without exposing PII
- Create GDPR/HIPAA compliant test environments

## File Formats Explained

### CSV (Comma-Separated Values)
- **What it is**: A plain text file where each line represents a row of data
- **Structure**: Values separated by commas, first row typically contains headers
- **Use cases**: Spreadsheet applications, data import/export, simple databases
- **Advantages**: Universal compatibility, human-readable, lightweight

### JSON (JavaScript Object Notation)
- **What it is**: Structured data format using key-value pairs
- **Structure**: Nested objects and arrays for complex data
- **Use cases**: APIs, web applications, configuration files
- **Advantages**: Preserves data types, supports nested structures

## Technical Details

### Data Generation Algorithm
- Uses deterministic random generation for consistency
- Ensures realistic data patterns (valid zip codes, phone formats)
- Maintains referential integrity within datasets
- Configurable seed values for reproducibility

### Performance
- Generates up to 10,000 rows in under 5 seconds
- Streaming downloads for large files
- Optimized for browser performance
- No server-side storage of generated data

### Security & Privacy
- All data is synthetic - no real personal information
- Generated on-demand, not stored
- Secure HTTPS downloads
- Temporary download links (expire after 1 hour)

## Frequently Asked Questions

### Q: What's the difference between synthetic and real data?
A: Synthetic data looks and behaves like real data but contains no actual personal information. It's completely fake but maintains realistic patterns and formats.

### Q: How many rows can I generate?
A: You can generate between 1 and 10,000 rows per request. For larger datasets, you can make multiple requests and combine the files.

### Q: Can I customize the data fields?
A: Yes, you can specify which types of data to include (names, addresses, dates, etc.) and configure format options.

### Q: How long are download links valid?
A: Download links expire after 1 hour for security. Generate a new file if you need a fresh link.

### Q: What browsers are supported?
A: Cutty works with all modern browsers: Chrome, Firefox, Safari, and Edge (latest versions).

## Tips for Best Results

1. **Start Small**: Generate a small dataset first to verify the format meets your needs
2. **Use Appropriate Formats**: Choose CSV for spreadsheets, JSON for applications
3. **Plan Your Schema**: Decide on column names and data types before generating
4. **Save Your Settings**: Export your configuration for consistent data generation
5. **Batch Operations**: Generate multiple related datasets in one session

## Integration Options

### API Access
- RESTful API endpoints for programmatic access
- Authentication via API keys
- Rate limiting: 100 requests per minute
- Webhook support for async operations

### Direct Downloads
- One-click download buttons
- No authentication required for public datasets
- Secure temporary URLs
- Resume support for large files

## Limitations

- Maximum 10,000 rows per generation request
- 8 US states currently supported (more coming soon)
- Download links expire after 1 hour
- No real-time collaboration features (yet)
`;

export const TOOL_USAGE_GUIDELINES = `
## When to Use Tools vs. Knowledge

### USE KNOWLEDGE (No Tools) When User Asks:
- "What is Cutty?"
- "How does Cutty work?"
- "What is a CSV file?"
- "Explain [feature]"
- "What can Cutty do?"
- "How do I use Cutty?"
- "What formats are supported?"
- General questions about functionality
- Explanations and tutorials
- Best practices and tips

### USE TOOLS When User Asks:
- "Generate [data]" - Use generateSyntheticData
- "Create [number] rows" - Use generateSyntheticData
- "Download [file]" - Use appropriate download tool
- "What states are supported?" - Use getSupportedStates
- "List available [options]" - Use appropriate listing tool
- Action-oriented requests
- Specific data operations

### Decision Framework:
1. Is the user asking for information? → Use knowledge base
2. Is the user asking for an action? → Use tools
3. Is the user asking about current state? → Use tools
4. Is the user asking for explanation? → Use knowledge base

### Response Guidelines:
- Keep responses concise (1-2 sentences for simple questions)
- Provide more detail only when asked
- Always be friendly and helpful
- Use tools only when necessary for the task
- Prefer knowledge-based answers for general questions
`;
