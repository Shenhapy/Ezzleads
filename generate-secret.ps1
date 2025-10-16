# Generate NEXTAUTH_SECRET
Write-Host "Generating NEXTAUTH_SECRET..." -ForegroundColor Cyan
Write-Host ""

$secret = [Convert]::ToBase64String((1..32 | ForEach-Object { Get-Random -Minimum 0 -Maximum 256 }))

Write-Host "Add this to your .env.local file:" -ForegroundColor Green
Write-Host ""
Write-Host "NEXTAUTH_SECRET=$secret" -ForegroundColor Yellow
Write-Host "NEXTAUTH_URL=http://localhost:3000" -ForegroundColor Yellow
Write-Host ""

# Check if .env.local exists
if (Test-Path ".env.local") {
    $response = Read-Host "Would you like to automatically add it to .env.local? (y/n)"
    if ($response -eq "y" -or $response -eq "Y") {
        $envContent = Get-Content ".env.local" -Raw
        
        # Check if NEXTAUTH_SECRET already exists
        if ($envContent -match "NEXTAUTH_SECRET=") {
            Write-Host "NEXTAUTH_SECRET already exists in .env.local" -ForegroundColor Yellow
            $replace = Read-Host "Replace it? (y/n)"
            if ($replace -eq "y" -or $replace -eq "Y") {
                $envContent = $envContent -replace "NEXTAUTH_SECRET=.*", "NEXTAUTH_SECRET=$secret"
                Set-Content ".env.local" -Value $envContent -NoNewline
                Write-Host "✓ Updated NEXTAUTH_SECRET in .env.local" -ForegroundColor Green
            }
        } else {
            # Add NEXTAUTH_SECRET
            Add-Content ".env.local" "`nNEXTAUTH_SECRET=$secret"
            Write-Host "✓ Added NEXTAUTH_SECRET to .env.local" -ForegroundColor Green
        }
        
        # Check and add NEXTAUTH_URL if missing
        if ($envContent -notmatch "NEXTAUTH_URL=") {
            Add-Content ".env.local" "NEXTAUTH_URL=http://localhost:3000"
            Write-Host "✓ Added NEXTAUTH_URL to .env.local" -ForegroundColor Green
        }
        
        Write-Host ""
        Write-Host "All set! Restart your dev server:" -ForegroundColor Cyan
        Write-Host "npm run dev" -ForegroundColor Yellow
    }
} else {
    Write-Host "⚠ .env.local file not found. Please create it and add the above variables." -ForegroundColor Red
}

Write-Host ""
Write-Host "Press any key to exit..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
