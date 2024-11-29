<img src='assets/Safe time lock-banner.png'>

It is a life-saving OMI AI wearable app. When the app detects you are in a dangerous situation (You are saying a code phrase), it will send a transaction to transfer your crypto to the wallet with a time lock or much higher security measures, so you need to be in a specific place or need other people to unlock it.

## Omi Plugin Published Details
```
  {
    "id": "Safe_Emergency_Lock",
    "name": "Safe Wallet Emergency Lock",
    "author": "Ivan Volovyk",
    "description": "Instantly time-lock your crypto or transfer it to the shared account if somebody is trying to beat a seed phrase out of you.",
    "image": "/assets/SOS-logo.png", 
    "capabilities": [
      "external_integration"
    ],
    "external_integration": {
      "triggers_on": "memory_creation",
      "webhook_url": "https://safe-omi.ivikkk.xyz/api",
      "setup_completed_url": "https://drinking-intent-kodjima33.replit.app/webhook/setup-status",
      "setup_instructions_file_path": "README.md"
    },
    "deleted": false
  }
```