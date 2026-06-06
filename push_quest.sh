#!/bin/bash
TOKEN=$(gh auth token)
git remote set-url origin "https://zonca:$TOKEN@github.com/zonca/quest.git"
git push origin main
