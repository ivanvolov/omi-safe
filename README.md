<img src='assets/Safe time lock-banner.png'>

SOS is the life-saving OMI AI wearable app. When SOS detects you are in a dangerous situation (Say "SOS"), it will contact the authorities with your location & context, to get you help ASAP.

## Omi Plugin Published Details
```
  {
    "id": "SOS",
    "name": "SOS-Emergency Help",
    "author": "Shrey Birmiwal",
    "description": "Alerts authorities and emergency contacts if OMI detects you are in danger. Say 'SOS' and OMI will send your location and context to get you help ASAP.",
    "image": "/plugins/logos/SOS-logo.png",
    "capabilities": [
      "external_integration"
    ],
    "external_integration": {
      "triggers_on": "memory_creation",
      "webhook_url": "https://sos-orcin.vercel.app/api",
      "setup_completed_url": "https://sos-orcin.vercel.app/setup_completed_url",
      "setup_instructions_file_path": "/plugins/instructions/SOS/README.md"
    },
    "deleted": false
  }
```