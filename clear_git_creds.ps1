$creds = cmdkey /list 2>$null | Select-String 'LegacyGeneric'
foreach ($line in $creds) {
    $l = $line.Line
    if ($l -match 'Target:\s*(.+)$') {
        $target = $matches[1].Trim()
        Write-Host "Deleting: $target"
        cmdkey /delete:$target 2>&1 | Out-Null
    }
}
Write-Host "Done."
