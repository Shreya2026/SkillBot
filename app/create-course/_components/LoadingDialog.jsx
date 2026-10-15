'use client';
import React from 'react'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Image from 'next/image';

function LoadingDialog({ loading }) {
  return (
    <AlertDialog open={loading}>
  <AlertDialogContent>
    <AlertDialogHeader>
      <AlertDialogTitle>Loading</AlertDialogTitle>

      {/* Keep text-only inside AlertDialogDescription */}
      <AlertDialogDescription>
        Please wait while we process your request.
      </AlertDialogDescription>

      {/* Move this below or above as needed */}
      <div className='flex flex-col items-center p-10'>
        <Image src='/loader.gif' alt='Loading...' width={100} height={100} />
      </div>
    </AlertDialogHeader>
  </AlertDialogContent>
</AlertDialog>

  );
}

export default LoadingDialog;
