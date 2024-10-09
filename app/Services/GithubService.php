<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Container\Attributes\CurrentUser;
use Illuminate\Container\Attributes\Config;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Http;

class GithubService
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        #[CurrentUser] protected User $user,
        #[Config('services.github.endpoint')] protected string $endpoint,
        protected string $token = '',
        protected string $username = '',
    ) {
        $githubDetails = $user->externApiDetails()->where('api_name', 'github')->firstOrFail();
        $this->token = $githubDetails->api_token;
        $this->username = $githubDetails->api_username;
    }

    public function getRepositories(int $page = 1, int $perPage = 10): Collection|null
    {
        return Http::withToken($this->token, 'token')
            ->withQueryParameters(['per_page' => $perPage, 'page' => $page])
            ->get("{$this->endpoint}/users/{$this->username}/repos")
            ->collect();
    }
}
