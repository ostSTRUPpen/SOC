REM Made by ostSTRUPpen
CLS
@ECHO off
TITLE saving
ECHO Jak chcete pojmenovat zmenu?
SET /p change=""
cd Code
TITLE saving
git add .
git commit -m "%change%" >> ../log.txt
git push -u origin main
TITLE saved